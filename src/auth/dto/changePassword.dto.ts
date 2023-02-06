import { IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PasswordsDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  password_confirmation: string;
}

export class ChangePasswordDto {
  @Type(() => PasswordsDto)
  @ValidateNested({ each: true })
  @IsNotEmptyObject()
  passwords: PasswordsDto;
}
