import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(200)
  @Get('heartbeat')
  heartbeat(): string {
    return this.appService.heartbeat();
  }
}
