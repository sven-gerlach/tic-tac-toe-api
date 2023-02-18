import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserModule } from '../src/user/user.module';
import * as request from 'supertest';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../src/user/schema/user.schema';
import * as process from 'process';

describe('Users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const userModuleRef = await Test.createTestingModule({
      imports: [UserModule, MongooseModule.forRoot(process.env.MONGO_URI || '')],

      // providers: [
      //   {
      //     provide: getModelToken(User.name),
      //     useValue: {},
      //   },
      // ],
    }).compile();

    app = userModuleRef.createNestApplication();
    await app.init();
  });

  it('/GET profile', () => {
    return request(app.getHttpServer()).get('/profile').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
