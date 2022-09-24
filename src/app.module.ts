import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { PrismaService } from 'database/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RQ_RS_FACTORY_SERVICE } from './interfaces';
import { RqRsFactoryService } from './services/rq-rs-factory.service';

/* -------------------------------------------------- */

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true })],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      useClass: RqRsFactoryService, // You can switch useClass to different implementation
      provide: RQ_RS_FACTORY_SERVICE,
    },
    {
      provide: 'RABBIT_SERVICE_ZONES',
      useFactory: (configService: ConfigService) => {
        const queue_input = configService.get<string>('ZONES_QUEUE_INPUT')
        const host = configService.get<string>('ZONES_HOST')
        //const user = configService.get<string>('ZONES_USER')
        //const password = configService.get<string>('ZONES_PASSWORD')
        const port = parseInt(configService.get<string>('ZONES_PORT'))

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            //urls: [`amqp://${user}:${password}@${host}:${port}`],
            urls: [`amqp://${host}:${port}`],
            queue: `${queue_input}`,
            queueOptions: {
              durable:  true, //persistent
            },
          },
        });       
      },
      inject: [ConfigService],
    },
  ],
})

/* -------------------------------------------------- */
export class AppModule {}
