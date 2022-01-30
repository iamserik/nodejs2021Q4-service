import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Board } from "./boards.entity";

@Entity('columns')
export class BoardColumn {
  @PrimaryGeneratedColumn('uuid' )
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(
    () => Board,
    (board: Board) => board.columns,
    { onDelete: 'CASCADE' },
  )
  board: Board;
}