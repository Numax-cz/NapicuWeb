import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class PopJonanekCounter extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  counter!: number;

}
