import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schema/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  const userServiceMock = {
    findOne: jest.fn(),
  };
  const jwtServiceMock = jest.fn();
  const userModelMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validate user', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    describe('if user is not found', () => {
      it('return undefined', async () => {
        userServiceMock.findOne.mockReturnValue(undefined);
        const result = authService.validateUser(email, password);
        await expect(result).resolves.toBeUndefined();
      });
    });

    describe('if user is found', () => {
      describe("if provided password doesn't match with password in database", () => {
        it('return undefined', async () => {
          userServiceMock.findOne.mockReturnValue({ password: 'wrong-password' });
          const result = authService.validateUser(email, password);
          await expect(result).resolves.toBeUndefined();
        });
      });
      describe('otherwise', () => {
        it('return the user object excluding the password property', async () => {
          const passwordHash = await bcrypt.hash(password, 10);
          userServiceMock.findOne.mockReturnValue({ password: passwordHash, email });
          const result = authService.validateUser(email, password);
          await expect(result).resolves.toEqual({ email });
        });
      });
    });
  });

  describe('change password', () => {
    const user: User = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      token: faker.random.alphaNumeric(10),
    };
    const newPassword = faker.internet.password();

    describe('if provided passwords do not match', () => {
      it('throw bad request error', async () => {
        const result = authService.changePassword(user, {
          password: newPassword,
          password_confirmation: newPassword + '2',
        });
        await expect(result).rejects.toBeInstanceOf(HttpException);
      });
    });

    describe('if user does not exist', () => {
      it('throw not found error', async () => {
        userModelMock.findOne.mockReturnValue(undefined);
        const result = authService.changePassword(user, {
          password: newPassword,
          password_confirmation: newPassword,
        });
        await expect(result).rejects.toBeInstanceOf(HttpException);
      });
    });

    describe('otherwise', () => {
      it('return success message', async () => {
        const saveMock = jest.fn();
        userModelMock.findOne.mockReturnValue({ ...user, save: saveMock });
        const result = authService.changePassword(user, {
          password: newPassword,
          password_confirmation: newPassword,
        });
        await expect(result).resolves.toEqual({ success: true, message: 'Password changed successfully' });
      });
    });
  });
});
