import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, PrimaryColumn } from "typeorm";
import { User } from "../user/User.entity";

@Entity()
export class Movie extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    imdbID: string;

    @Column()
    title: string;

    @Column()
    year: string;

    @Column()
    poster: string;
}