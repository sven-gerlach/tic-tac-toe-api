import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { LoggerModule } from 'nestjs-pino';
import GameModule from './game/game.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI
          ? process.env.MONGO_URI
          : () => {
              throw new Error('MongoDB URI string failed to load');
            },
      }),
    }),
    AuthModule,
    UserModule,
    GameModule,
    LoggerModule.forRoot(),
  ],
})
export class AppModule {}
