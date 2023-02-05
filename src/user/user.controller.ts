import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Request as RequestNest } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { Request as RequestExpress } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  signUp(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const { email, password, password_confirmation: passwordConfirmation } = createUserDto;
    console.log({ email, password, passwordConfirmation });

    try {
      return this.userService.createOne(email, password, passwordConfirmation);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@RequestNest() req: RequestExpress) {
    return req.user;
  }
}
