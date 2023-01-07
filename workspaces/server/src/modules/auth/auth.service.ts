import bcrypt from 'bcrypt';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';

import AppConfig from '@server/app.config';
import { UserService } from '@server/modules/user/user.service';
import { exclude } from '@shared/utils/object.utils';
import { ExpirationTime } from '@server/modules/auth/strategies/jwt.strategy';

import { User } from '@prisma/client';
import { ErrorCodes } from '@shared/enums';
import { RequestUser } from '@shared/types/auth.types';
import { AuthEntity } from '@server/modules/auth/entities/auth.entity';
import { LoginDto } from '@server/modules/auth/dto/auth.dto';

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

  async generateTokens(
    reqUser: RequestUser,
    oldRefreshToken?: string
  ): Promise<AuthEntity> {
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

    const refreshToken = this.jwtService.sign(user, {
      expiresIn: ExpirationTime.refreshToken,
    });
    const accessToken = this.jwtService.sign(user);
    await this.userService.updateUserToken(user, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    try {
      const user = await this.validateUser(loginDto);
      return this.generateTokens(user);
    } catch (error) {
      throw error;
    }
  }

  async refresh(user: RequestUser, incomingToken: string): Promise<AuthEntity> {
    const oldToken = incomingToken?.replace('Bearer', '')?.trim();
    if (!oldToken) {
      throw new BadRequestException(ErrorCodes.InvalidRefreshToken);
    }
    return await this.generateTokens(user, oldToken);
  }
}
