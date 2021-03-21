import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportModule } from './export/export.module';
import { RequestInterceptor } from './request.interseptor';
import { APP_INTERCEPTOR } from '@nestjs/core';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot(),
    ExportModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor
    }
  ]
})
export class AppModule { }
