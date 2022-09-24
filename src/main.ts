import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

/* -------------------------------------------------- */

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);
  const host = configService.get<string>('COMPANY_DEPENDENCIES_HOST');
  const port = parseInt(configService.get<string>('COMPANY_DEPENDENCIES_PORT'));

  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.REDIS,
    options: {
      host: host,
      port: port,
    },
  };

  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );

  app.useGlobalPipes(
    // Cast automaticaly class-transform
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen();
}

/* -------------------------------------------------- */

bootstrap();
