import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppConfig from '@server/app.config';
import { AppService } from '@server/app.service';
import { AppController } from '@server/app.controller';
import { PrismaModule } from '@server/modules/prisma/prisma.module';

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
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
