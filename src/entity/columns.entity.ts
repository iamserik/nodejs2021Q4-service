import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Board } from "./boards.entity";
import { Task } from "./tasks.entity";

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

  @OneToMany(
    () => Task,
    (task: Task) => task.columnId,
    { cascade: true }
  )
  tasks: BoardColumn
}