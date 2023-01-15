import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConsoleLogger, Logger, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigType } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';

import AppConfig from '@server/app.config';
import { AppModule } from '@server/modules/app/app.module';

import { ERoute } from '@shared/enums';

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

  const mode = process.env.NODE_ENV || 'development';
  const appConfig = app.get<ConfigType<typeof AppConfig>>(AppConfig.KEY);
  const { appPort, appSecret } = appConfig;

  const { httpAdapter } = app.get(HttpAdapterHost);
  const prismaService: PrismaService = app.get(PrismaService);

  app
    .useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
    .setGlobalPrefix(ERoute.Api)
    .useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))
    .register(fastifyCookie, {
      secret: appSecret,
      prefix: '__Host-',
      parseOptions: { httpOnly: true, maxAge: 300, path: '/' },
    });

  await prismaService.enableShutdownHooks(app);

  if (mode === 'development') {
    const { DocumentBuilder, SwaggerModule } = await import('@nestjs/swagger');
    const config = new DocumentBuilder()
      .setTitle('NEST example')
      .setDescription('The NEST API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(ERoute.Swagger, app, document);
  }

  await app.listen(appPort, '::');

  Logger.debug(
    `🚀 Server is running in ${mode} mode on port ${appPort}`,
    'Bootstrap'
  );
})().catch((error) => Logger.error(error, 'Bootstrap'));
