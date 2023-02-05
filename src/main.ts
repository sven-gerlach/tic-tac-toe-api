import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  // enable buffering of logs
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // enable cors
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
  });

  // set Pino as the default logger
  app.useLogger(app.get(Logger));

  // set global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => console.log(`Server listening on port ${port}`));
}
bootstrap();
