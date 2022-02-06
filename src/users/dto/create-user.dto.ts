import { IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly login: string;

  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 20, {message: 'Должно быть не меньше 4 и не больше 12'})
  readonly password: string;
}