import { Entity, Column, PrimaryGeneratedColumn, EntityTarget } from "typeorm";

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

  toApi() {
    const { name, id, avatar } = this;
    return {
      name,
      id,
      avatar
    };
  }
}

export const userQuery = () => {
  return AppDataSource.getRepository(User).createQueryBuilder("user");
};
