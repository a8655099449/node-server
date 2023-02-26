import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { Length } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(6, 20)
  name: string;

  /** @desc 用户账号 */
  @Column()
  account: string;

}
