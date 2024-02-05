import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export class BaseSchema {
    @PrimaryGeneratedColumn('uuid')
    _id: string = uuid();

    @CreateDateColumn()
    created_at: Date = new Date();

    @UpdateDateColumn()
    updated_at: Date = new Date();
}
