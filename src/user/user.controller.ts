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
    // return any errors thrown in the service module (e.g. user already exists)
    try {
      return this.userService.createOne(createUserDto);
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
