import { Entity, Column } from 'typeorm';
import { Base } from './TimestampedEntity';

@Entity('users')
export class User extends Base {
    @Column()
    name: string;

    @Column({ unique: true })
    login: string;

    @Column()
    password: string;
}