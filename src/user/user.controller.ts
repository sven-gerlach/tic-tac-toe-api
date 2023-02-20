import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  signUp(@Body() createUserDto: CreateUserDto) {
    // return any errors thrown in the service module (e.g. user already exists)
    try {
      return this.userService.createOne(createUserDto);
    } catch (error) {
      return error;
    }
  }
}
