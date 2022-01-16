import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from './TimestampedEntity';
import { Task } from './Task';

@Entity('users')
export class User extends Base {
    @Column()
    name: string;

    @Column({ unique: true })
    login: string;

    @Column()
    password: string;

    @OneToMany(
        () => Task,
        (task: Task) => task.user,
    )
    tasks: Task;
}