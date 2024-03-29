import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { AppService } from '@server/modules/app/app.service';
import { AppController } from '@server/modules/app/app.controller';
import { UserModule } from '@server/modules/user/user.module';
import { AuthModule } from '@server/modules/auth/auth.module';
import { StationModule } from '@server/modules/station/station.module';
import { BikeModule } from '@server/modules/bike/bike.module';
import { RideModule } from '@server/modules/ride/ride.module';
import { CommentModule } from '@server/modules/comment/comment.module';

import AppConfig from '@server/app.config';
import { validateEnv } from '@server/common/utils/validation.utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      cache: true,
      load: [AppConfig],
      validate: validateEnv,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    StationModule,
    BikeModule,
    RideModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
