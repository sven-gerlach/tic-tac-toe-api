import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

describe('UserController', () => {
  let userController: UserController;
  const user: CreateUserDto = {
    email: 'test@test.de',
    password: '1234',
    password_confirmation: '1234',
  };
  const mockUserService = {
    createOne: jest.fn((dto) => ({
      id: 1234,
      ...dto,
    })),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    userController = moduleRef.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('/sign-up should create a new user', () => {
    expect(userController.signUp(user)).toEqual({
      id: expect.any(Number),
      ...user,
    });
  });

  afterAll(() => jest.resetAllMocks());
});
