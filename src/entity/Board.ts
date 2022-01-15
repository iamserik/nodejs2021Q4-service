import { Entity, Column } from 'typeorm';
import { Base } from './TimestampedEntity';

@Entity('boards')
export class Board extends Base {
    @Column()
    title: string;
}