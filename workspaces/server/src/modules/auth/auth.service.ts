import bcrypt from 'bcrypt';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';
import { FastifyReply } from 'fastify';

import AppConfig from '@server/app.config';
import { UserService } from '@server/modules/user/user.service';
import { exclude } from '@shared/utils/object.utils';
import { hideCardNumber } from '@shared/utils/string.utils';
import { ExpirationTime } from '@server/modules/auth/strategies';

import { ECookieNames, EErrorMessages } from '@shared/enums';
import { RequestUser } from '@shared/types/auth.types';
import { LoginDto } from '@server/modules/auth/dto/auth.dto';
import { SuccessEntity } from '@server/common/entities/common.entities';
import { UserEntity } from '@server/modules/user/entities/user.entity';

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
    const name = isAccessToken
      ? ECookieNames.AccessTokenCookieName
      : ECookieNames.RefreshTokenCookieName;
    const expirationTime = isAccessToken
      ? ExpirationTime.accessToken
      : ExpirationTime.refreshToken;

    res.setCookie(name, token, {
      secure: !this.appConfig.isDev,
      maxAge: expirationTime,
    });
  }

  setCookieWithUser(res: FastifyReply, user: UserEntity) {
    res.setCookie(ECookieNames.UserCookieName, JSON.stringify(user), {
      secure: !this.appConfig.isDev,
      httpOnly: false,
      maxAge: ExpirationTime.refreshToken,
      encode: String,
    });
  }

  async handleTokenUpdates(
    res: FastifyReply,
    reqUser: RequestUser,
    oldRefreshToken?: string
  ): Promise<SuccessEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: reqUser.id,
      },
    });

    if (
      oldRefreshToken &&
      this.jwtService.decode(user.refreshToken) !== oldRefreshToken
    ) {
      throw new BadRequestException(EErrorMessages.InvalidRefreshToken);
    }
    delete user.refreshToken;

    const decodedCardNumber = this.jwtService.decode(user.card.number);
    user.card.number = decodedCardNumber as string;

    const accessToken = this.jwtService.sign(user, {
      secret: this.appConfig.jwtSecret,
      expiresIn: ExpirationTime.accessToken,
    });
    const refreshToken = this.jwtService.sign(user, {
      secret: this.appConfig.jwtRefreshSecret,
      expiresIn: ExpirationTime.refreshToken,
    });

    const returnUser: UserEntity = {
      name: reqUser.name,
      role: reqUser.role,
      email: reqUser.email,
      card: {
        number: hideCardNumber(user.card.number),
        expDate: user.card.expDate,
      },
    };

    await this.userService.updateUserToken(user, refreshToken);

    this.setCookieWithJwtToken(res, refreshToken);
    this.setCookieWithJwtToken(res, accessToken, true);
    this.setCookieWithUser(res, returnUser);

    return { success: true };
  }

  async login(res: FastifyReply, loginDto: LoginDto): Promise<SuccessEntity> {
    try {
      const user = await this.validateUser(loginDto);
      return await this.handleTokenUpdates(res, user);
    } catch (error) {
      Logger.warn(`${loginDto.email}: ${error}`, 'AuthService:login');
      throw error;
    }
  }

  logout(res: FastifyReply): SuccessEntity {
    res.clearCookie(ECookieNames.AccessTokenCookieName);
    res.clearCookie(ECookieNames.RefreshTokenCookieName);
    res.clearCookie(ECookieNames.UserCookieName);
    return { success: true };
  }

  async refresh(
    res: FastifyReply,
    user: RequestUser,
    incomingToken: string
  ): Promise<SuccessEntity> {
    try {
      return this.handleTokenUpdates(res, user, incomingToken);
    } catch (error) {
      Logger.error(`${user.email}: ${error}`, 'AuthService:refresh');
      throw error;
    }
  }
}
