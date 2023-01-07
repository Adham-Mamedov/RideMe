import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppConfig from '@server/app.config';
import { UserController } from '@server/modules/user/user.controller';
import { UserService } from '@server/modules/user/user.service';

import { validateEnv } from '@server/common/utils/validation.utils';
import { PrismaService } from 'nestjs-prisma';
import { JwtStrategy } from '@server/modules/auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      cache: true,
      load: [AppConfig],
      validate: validateEnv,
    }),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
