import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from './BaseEntity';
import {Task} from "./tasks.entity";
import { BoardColumn } from "./columns.entity";

@Entity('boards')
export class Board extends Base {
  @Column()
  title: string;

  @OneToMany(
    () => Task,
    (task: Task) => task.boardId,
    { cascade: true },
  )
  tasks: Task;

  @OneToMany(
    () => BoardColumn,
    (column: BoardColumn) => column.board,
    { cascade: true, eager: true },
  )
  columns: BoardColumn;
}