import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  console.log(process.env);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
  });
  await app.listen(port, () => console.log(`Server listening on port ${port}`));
}
bootstrap();
