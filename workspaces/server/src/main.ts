import { NestFactory } from '@nestjs/core';
import { ConsoleLogger, Logger, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigType } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';

import AppConfig from '@server/app.config';
import { AppModule } from '@server/app.module';

import { Route } from '@shared/enums';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      rawBody: true,
      logger: new ConsoleLogger('APP', {
        logLevels: ['error', 'warn', 'debug'],
      }),
    }
  );

  const appConfig = app.get<ConfigType<typeof AppConfig>>(AppConfig.KEY);
  const { appPort, appSecret } = appConfig;

  app
    .useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
    .setGlobalPrefix(Route.Api)
    .register(fastifyCookie, {
      secret: appSecret,
      prefix: '__Host-',
      parseOptions: { httpOnly: true, maxAge: 300, path: Route.Api },
    });

  await app.listen(appPort, '::');
  const mode = process.env.NODE_ENV || 'development';

  Logger.debug(
    `🚀 Server is running in ${mode} mode on port ${appPort}`,
    'Bootstrap'
  );
})().catch((error) => Logger.error(error, 'Bootstrap'));