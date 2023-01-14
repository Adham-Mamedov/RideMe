import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';

import {
  JwtStrategy,
  JwtRefreshStrategy,
} from '@server/modules/auth/strategies';
import { UserModule } from '@server/modules/user/user.module';
import { AuthController } from '@server/modules/auth/auth.controller';
import { AuthService } from '@server/modules/auth/auth.service';

@Module({
  imports: [PassportModule, JwtModule, UserModule],
  providers: [AuthService, PrismaService, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
