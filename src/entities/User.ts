import { Entity, Column, PrimaryGeneratedColumn, EntityTarget } from "typeorm";

import { Length } from "class-validator";
import AppDataSource from "../db";
import { IsUnique } from "../utils/vaildator/UniqueName";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  /** @desc 用户名 */
  @Column({
    unique: true,
  })
  @Length(6, 20)
  @IsUnique(User, "name")
  name: string;

  /** @desc 用户账号 */
  @Column({
    unique: true,
  })
  @IsUnique(User, "account")
  account: string;

  /** @desc 用户密码 */
  @Column({
    default: "-",
  })
  password: string;
}

export const userQuery = () => {
  return AppDataSource.getRepository(User).createQueryBuilder("user");
};
