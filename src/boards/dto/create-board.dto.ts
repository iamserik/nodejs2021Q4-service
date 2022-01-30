export class BoardColumn {
  title: string;
  order: number;
}

export class CreateBoardDto {
  readonly title: string;
  readonly columns: BoardColumn[];
}