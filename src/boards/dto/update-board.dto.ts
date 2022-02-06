import { IsString } from "class-validator";

export class UpdateBoardDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;
}