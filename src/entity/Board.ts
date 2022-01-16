import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from './TimestampedEntity';
import {Task} from "./Task";

@Entity('boards')
export class Board extends Base {
    @Column()
    title: string;

    @OneToMany(
        () => Task,
        (task: Task) => task.board,
    )
    tasks: Task;
}