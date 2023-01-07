import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';

import {
  ExpirationTime,
  JwtStrategy,
} from '@server/modules/auth/strategies/jwt.strategy';
import { UserModule } from '@server/modules/user/user.module';
import { AuthController } from '@server/modules/auth/auth.controller';
import { AuthService } from '@server/modules/auth/auth.service';
import AppConfig from '@server/app.config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: AppConfig().jwtSecret,
      signOptions: { expiresIn: ExpirationTime.accessToken },
    }),
    UserModule,
  ],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
