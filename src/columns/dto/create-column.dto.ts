import { IsNumber, IsString } from "class-validator";

export class CreateColumnDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @IsNumber({}, { message: 'Должен быть числом' })
  readonly order: number;

  @IsString({ message: 'Должно быть строкой' })
  readonly boardId: string;
}