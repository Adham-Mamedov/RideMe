import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { User } from '@prisma/client';

import AppConfig from '@server/app.config';
import { cookieExtractor } from '@server/modules/auth/strategies/index';
import { ECookieNames } from '@shared/enums';
import { RequestUser } from '@shared/types/auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(AppConfig.KEY)
    private readonly appConfig: ConfigType<typeof AppConfig>
  ) {
    super({
      jwtFromRequest: cookieExtractor(ECookieNames.AccessTokenCookieName),
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
