import { BaseContext } from "../../@types/global";
import AppDataSource from "../../db";
import { User } from "../../entities/User";
import { failResponse } from "../response";

const authPaths = ["/user/edit"];

export const authWare = async (ctx: BaseContext, next: any) => {
  const { path } = ctx;
  // 需要鉴权的路径
  if (authPaths.includes(path)) {
    const token = ctx.request.header.authorization;
    if (!token) {
      failResponse(ctx, {
        code: 401,
        message: "请先登录",
      });
      return;
    }
    // 根据token获取用户信息
    const u = await AppDataSource.getRepository(User).findOne({
      where: {
        token,
      },
    });
    if (!u) {
      failResponse(ctx, {
        code: 401,
        message: "请先登录",
      });
      return;
    }

    await next();
  }
};
