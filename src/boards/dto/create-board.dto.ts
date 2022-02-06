import { IsArray, IsOptional, IsString } from "class-validator";

export class BoardColumn {
  title: string;
  order: number;
}

export class CreateBoardDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @IsArray()
  @IsOptional()
  readonly columns: BoardColumn[];
}