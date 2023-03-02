import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  FindManyOptions,
  Like,
} from "typeorm";
import AppDataSource from "../db";

type whereOptions = {
  key: string;
  type: "like" | "equal";
  value: string;
};

type paginateOptions = {
  wheres?: whereOptions[];
};

export abstract class DefaultColumn {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createTime: Date;
  @UpdateDateColumn()
  updateTime: Date;

  static async paginate<T = DefaultColumn>(
    page: number,
    pageSize: number,
    options?: FindManyOptions & paginateOptions
  ): Promise<{
    items: T[];
    total: number; page: number; pageSize: number; totalPages: number
  }> {
    const { wheres } = options;

    const getWhere = () => {
      if (!wheres) {
        return {};
      }
      const where: any = {};
      wheres.forEach((item) => {
        const { key, type, value } = item;
        if (type === "equal") {
          where[key] = value;
        } else if (type === "like") {
          where[key] = Like(`%${value}%`);
        }
      });
      return where;
    };

    const [items, total] = await AppDataSource.getRepository(this).findAndCount(
      {
        skip: pageSize * (page - 1),
        take: pageSize,
        where: getWhere(),
        ...(options as any),
      }
    );

    const totalPages = Math.ceil(total / pageSize);

    return {
      items: items as any,
      total,
      page,
      pageSize,
      totalPages,
    };
  }
}
