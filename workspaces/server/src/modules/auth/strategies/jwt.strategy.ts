import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import AppConfig from '@server/app.config';
import { ConfigType } from '@nestjs/config';
import { User } from '@prisma/client';
import { RequestUser } from '@shared/types/auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AppConfig.KEY)
    private readonly appConfig: ConfigType<typeof AppConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.jwtSecret,
      usernameField: 'email',
    });
  }

  async validate(user: Partial<User>): Promise<RequestUser> {
    return {
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }
}

export const enum ExpirationTime {
  accessToken = '1200s',
  refreshToken = '1d',
}
