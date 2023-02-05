import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { LoggerModule } from 'nestjs-pino';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: path.resolve(process.cwd(), '.env.dev') }),
    AuthModule,
    UserModule,
    MongooseModule.forRoot(
      process.env.MONGO_URI
        ? process.env.MONGO_URI
        : (() => {
            throw new Error('MongoDB URI string failed to load');
          })(),
    ),
    LoggerModule.forRoot(),
  ],
})
export class AppModule {}
