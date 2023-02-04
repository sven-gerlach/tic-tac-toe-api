import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('create')
  signUp(@Body() createUserDto: CreateUserDto) {
    const { email, password, 'password-confirmation': passwordConfirmation } = createUserDto;
    try {
      return this.userService.createOne(email, password, passwordConfirmation);
    } catch (error) {
      return error;
    }
  }
}
