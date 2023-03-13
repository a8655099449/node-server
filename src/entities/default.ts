import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  FindManyOptions,
} from "typeorm";
import AppDataSource from "../db";

export abstract class DefaultColumn {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createTime: Date;
  @UpdateDateColumn()
  updateTime: Date;

  static async paginate(
    page: number,
    pageSize: number,
    options?: FindManyOptions
  ) {
    const [items, total] = await AppDataSource.getRepository(this).findAndCount(
      {
        skip: pageSize * (page - 1),
        take: pageSize,
        ...options as any,
      }
    );

    const totalPages = Math.ceil(total / pageSize);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
    };
  }
}
