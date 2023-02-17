import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { faker } from '@faker-js/faker';
import { CustomError } from '../util/customError';

type UserModel = Partial<Record<keyof Model<any>, jest.Mock>>;
const createUserModelMock = (): UserModel => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let userModelMock: UserModel;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: createUserModelMock(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModelMock = module.get<UserModel>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const email = faker.internet.email();
  const password = faker.internet.password();
  const user: CreateUserDto = { email, password, password_confirmation: password };

  describe('findOne', () => {
    it('should return a user if the email exists', async () => {
      userModelMock.findOne?.mockReturnValue({ toObject: jest.fn(() => user) });
      const result = await service.findOne(email);
      expect(userModelMock.findOne).toHaveBeenCalled();
      expect(result).toBe(user);
    });

    it('should return undefined if the email does not exist', async () => {
      userModelMock.findOne?.mockReturnValue(undefined);
      const result = await service.findOne('incorrect_email@false.com');
      expect(userModelMock.findOne).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  describe('createOne', () => {
    describe('if user already exists', () => {
      it('should return a bad request error', async () => {
        userModelMock.findOne?.mockReturnValue({ toObject: jest.fn(() => user) });
        const result = await service.createOne(user);
        expect(result).toBeInstanceOf(CustomError);
      });
    });
    describe("if provided passwords don't match", () => {
      it('should return a bad request error', async () => {
        userModelMock.findOne?.mockReturnValue({ toObject: jest.fn(() => undefined) });
        const userDtoIncorrectPassword = {
          ...user,
          password: '123',
          password_confirmation: 'abc',
        };
        const result = await service.createOne(userDtoIncorrectPassword);
        expect(result).toBeInstanceOf(CustomError);
      });
    });
    describe('otherwise', () => {
      it('should return the created user', async () => {
        userModelMock.findOne?.mockReturnValue({ toObject: jest.fn(() => undefined) });
        const saveMock = jest.fn();
        const toObjectMock = jest.fn(() => user);
        jest.spyOn(userModelMock, 'create').mockReturnValue({ save: saveMock, toObject: toObjectMock });
        await service.createOne(user);
        expect(saveMock).toHaveBeenCalled();
        expect(toObjectMock).toHaveBeenCalled();
        jest.resetAllMocks();
      });
    });
  });
});
