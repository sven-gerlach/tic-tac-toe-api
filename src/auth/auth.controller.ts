import { Body, Controller, Delete, HttpCode, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { RequestWithUser } from './interface/requestWithUser';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('sign-out')
  @HttpCode(204)
  signOut() {
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req: RequestWithUser) {
    try {
      return this.authService.changePassword(req.user, changePasswordDto.passwords);
    } catch (error) {
      return error;
    }
  }
}
