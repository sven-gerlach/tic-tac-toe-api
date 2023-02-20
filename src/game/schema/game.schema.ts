import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Game {
  @Prop({
    required: true,
    validate: [(cells: string[]) => cells.length === 9, 'Cells must be an array with nine strings'],
  })
  cells: string[];

  @Prop({
    required: true,
  })
  over: boolean;

  @Prop()
  owner: string;
}

export type gameDocument = HydratedDocument<Game>;

export const GameSchema = SchemaFactory.createForClass(Game);
