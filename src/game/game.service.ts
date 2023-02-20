import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schema/user.schema';
import { PayloadInterface } from '../auth/interface/payload.interface';
import { Game, gameDocument } from './schema/game.schema';
import UpdateGameDto from './dto/updateGame.dto';

@Injectable()
export default class GameService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async startGame(user: PayloadInterface) {
    const userDocument = await this.userModel.findById(user._id);

    if (!userDocument) {
      throw new NotFoundException(`User with the id: ${user._id} could not be found`);
    }

    const newGame = {
      cells: ['', '', '', '', '', '', '', '', ''],
      over: false,
      owner: user._id,
    };

    userDocument.games.push(newGame);
    await userDocument.save();
    const games = userDocument.games;
    return { game: games[games.length - 1] };
  }

  async updateGame(user: PayloadInterface, game: UpdateGameDto, gameId: string) {
    const userDocument = await this.userModel.findById(user._id);

    if (!userDocument) {
      throw new NotFoundException(`User with id ${user._id} does not exist`);
    }

    const gameDocument = userDocument.games.find((game: gameDocument) => game.id == gameId);

    if (!gameDocument) {
      throw new NotFoundException(`Game with id ${gameId} does not exist`);
    }

    gameDocument.cells[Number(game.cell.index)] = game.cell.value;
    gameDocument.over = game.over;

    await userDocument.save();

    return userDocument.games.find((game: gameDocument) => game.id == gameId);
  }

  async findAll(user: PayloadInterface) {
    const userDocument = await this.userModel.findById(user._id);

    if (!userDocument) {
      throw new NotFoundException(`A user with id ${user._id} could not be found`);
    }

    return { games: userDocument.games };
  }
}
