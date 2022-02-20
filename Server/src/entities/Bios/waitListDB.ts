import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class BiosWaitList extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;
}
