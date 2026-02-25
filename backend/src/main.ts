import { ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import * as express from 'express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', express.static('uploads'));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ตัด field แปลกปลอมทิ้งอัตโนมัติ
      // transform: true,
      forbidNonWhitelisted: true, // (Optional) แจ้ง Error ถ้ามี field แปลกปลอม

      transform: true, // แปลง payload เป็น class ตาม DTO

      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.use(helmet());
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
