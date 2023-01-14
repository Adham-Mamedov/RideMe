import bcrypt from 'bcrypt';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { FastifyReply } from 'fastify';

import AppConfig from '@server/app.config';
import { UserService } from '@server/modules/user/user.service';
import { exclude } from '@shared/utils/object.utils';
import {
  AccessTokenCookieName,
  ExpirationTime,
  RefreshTokenCookieName,
} from '@server/modules/auth/strategies';

import { User } from '@prisma/client';
import { ErrorCodes } from '@shared/enums';
import { RequestUser } from '@shared/types/auth.types';
import { LoginDto } from '@server/modules/auth/dto/auth.dto';
import { SuccessEntity } from '@server/common/entities/common.entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,

    @Inject(AppConfig.KEY)
    private readonly appConfig: ConfigType<typeof AppConfig>
  ) {}

  async validateUser(loginDto: LoginDto): Promise<RequestUser> {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user) throw new BadRequestException('User not found');
    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    if (!isPasswordMatching)
      throw new BadRequestException('Email or Password is incorrect');
    return exclude<User, 'password'>(user, ['password']);
  }

  setCookieWithJwtToken(
    res: FastifyReply,
    token: string,
    isAccessToken = false
  ) {
    const name = isAccessToken ? AccessTokenCookieName : RefreshTokenCookieName;
    const expirationTime = isAccessToken
      ? ExpirationTime.accessToken
      : ExpirationTime.refreshToken;
    res.setCookie(name, token, {
      secure: !this.appConfig.isDev,
      maxAge: expirationTime,
    });
  }

  async handleTokenUpdates(
    res: FastifyReply,
    reqUser: RequestUser,
    oldRefreshToken?: string
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: reqUser.id,
      },
    });

    if (
      oldRefreshToken &&
      this.jwtService.decode(user.refreshToken) !== oldRefreshToken
    ) {
      throw new BadRequestException(ErrorCodes.InvalidRefreshToken);
    }
    delete user.refreshToken;

    const accessToken = this.jwtService.sign(user, {
      secret: this.appConfig.jwtSecret,
      expiresIn: ExpirationTime.accessToken,
    });
    const refreshToken = this.jwtService.sign(user, {
      secret: this.appConfig.jwtRefreshSecret,
      expiresIn: ExpirationTime.refreshToken,
    });

    await this.userService.updateUserToken(user, refreshToken);

    this.setCookieWithJwtToken(res, refreshToken);
    this.setCookieWithJwtToken(res, accessToken, true);

    return { success: true };
  }

  async login(res: FastifyReply, loginDto: LoginDto): Promise<SuccessEntity> {
    try {
      const user = await this.validateUser(loginDto);
      return await this.handleTokenUpdates(res, user);
    } catch (error) {
      throw error;
    }
  }

  logout(res: FastifyReply): SuccessEntity {
    res.clearCookie(AccessTokenCookieName);
    res.clearCookie(RefreshTokenCookieName);
    return { success: true };
  }

  async refresh(
    res: FastifyReply,
    user: RequestUser,
    incomingToken: string
  ): Promise<SuccessEntity> {
    return this.handleTokenUpdates(res, user, incomingToken);
  }
}
