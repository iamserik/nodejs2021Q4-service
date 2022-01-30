import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from './BaseEntity';
import {Task} from "./tasks.entity";

@Entity('boards')
export class Board extends Base {
  @Column()
  title: string;

  @OneToMany(
    () => Task,
    (task: Task) => task.board,
    { cascade: true },
  )
  tasks: Task;
}