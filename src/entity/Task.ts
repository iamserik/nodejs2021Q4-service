import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './TimestampedEntity';
import { User} from './User';
import { Board } from './Board';

@Entity('tasks')
export class Task extends Base {
    @Column()
    title: string;

    @Column()
    order: number;

    @Column({ type: "text" })
    description: string;

    @ManyToOne(
        () => User,
        (user: User) => user.tasks,
        { nullable: true, onDelete: 'SET NULL' },
    )
    @JoinColumn({ name: 'userId'})
    user: User;

    @ManyToOne(
        () => Board,
        (board: Board) => board.tasks,
        { onDelete: 'CASCADE' },
    )
    @JoinColumn({ name: 'boardId' })
    board: Board;
}