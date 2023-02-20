import { IsBoolean, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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

  @IsBoolean()
  over: boolean;
}
