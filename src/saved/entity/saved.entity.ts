import { User } from 'src/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Saved {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    animeId: string;

    @ManyToOne(() => User, (user) => user.saved)
    user: User

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}