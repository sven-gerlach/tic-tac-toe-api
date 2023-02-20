import { IsBoolean, IsString, ValidateNested } from 'class-validator';
import {Transform, Type} from 'class-transformer';

class Cell {
  @IsString()
  index: string;

  @IsString()
  value: string;
}

export default class UpdateGameDto {
  @ValidateNested()
  @Type(() => Cell)
  cell: Cell;

  @Transform(({ value: over }) => [true, 'true'].includes(over))
  @IsBoolean()
  over: boolean;
}
