import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  EntityTarget,
  FindOneOptions,
} from "typeorm";

import { Length } from "class-validator";
import AppDataSource from "../db";
import { IsUnique } from "../utils/vaildator/UniqueName";
import { DefaultColumn } from "./default";

@Entity()
export class User extends DefaultColumn {
  /** @desc 用户名 */
  @Column({
    unique: true,
  })
  @Length(1, 20)
  @IsUnique(User, "name", "用户名")
  name: string;

  /** @desc 用户账号 */
  @Column({
    unique: true,
  })
  @IsUnique(User, "account", "用户账号")
  account: string;

  /** @desc 用户密码 */
  @Column({
    default: "-",
  })
  password: string;
  /** @desc 用户头像 */
  @Column({
    default:
      "https://picx.zhimg.com/50/v2-7f52c46dbe2c4352454f9cca4c1ddda4_l.jpg?source=b6762063",
  })
  avatar: string;

  @Column({
    default: "",
  })
  token: string;

  @Column({
    default: "",
  })
  birthday: Date;

  @Column({
    default: 2,
    enum: [0, 1, 2],
  }) // 0 男 1 女 2 未知
  gender: number;

  toApi() {
    // 1. Extract the values from the object
    const { name, id, avatar, createTime } = this;
    // 2. Return an object with the values
    return {
      name,
      id,
      avatar,
      createTime,
    };
  }

 
}

// This function returns a query builder for the user repository. It does this by getting the repository from the AppDataSource, and then creating a query builder from that repository.
// The query builder is used to create queries for the user repository.
export const userQuery = () => {
  const repo = AppDataSource.getRepository(User);
  if (!repo) {
    throw new Error("User repository not found");
  }

  return repo.createQueryBuilder("user");
};
