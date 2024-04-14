import { Saved } from 'src/saved/entity/saved.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
@Unique(["username"])
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    hashedPassword: string;

    @Column()
    email: string;

    @OneToMany(() => Saved, (saved) => saved.user)
    saved: Saved[];
}