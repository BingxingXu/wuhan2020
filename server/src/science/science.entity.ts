import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Science {
    @PrimaryGeneratedColumn()
    sourceId: number;

    @Column()
    title: string;

    @Column()
    url: string;

    @Column()
    cover: string;

    @Column()
    content: string;

    @Column()
    fromName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
