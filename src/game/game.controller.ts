import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import GameService from './game.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { PayloadInterface } from '../auth/interface/payload.interface';
import UpdateGameDto from './dto/updateGame.dto';

@Controller('/games')
export default class GameController {
  constructor(private gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  startGame(@User() user: PayloadInterface) {
    return this.gameService.startGame(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':gameId')
  updateGame(@Param('gameId') gameId: string, @User() user: PayloadInterface, @Body('game') game: UpdateGameDto) {
    return this.gameService.updateGame(user, game, gameId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@User() user: PayloadInterface) {
    return this.gameService.findAll(user);
  }
}
