import { getConnection } from "typeorm";
import AppDataSource from "../db";
import { User } from "../entities/User";

import Router from "koa-router";
import to from "../utils/await";
import { validate } from "class-validator";
const useRouter = new Router();

useRouter.get("/all", async (ctx, next) => {
  ctx.body = await AppDataSource.manager.find(User);
});
useRouter.post("/create", async (ctx, next) => {
  const user = AppDataSource.getRepository(User).create(ctx.request.body);

  const [err1, res1] = await to(validate(user));

  if (res1.length > 0) {
    ctx.body = res1;
    console.log('👴出错了',)
    return;
  }

  const [err, res] = await to(AppDataSource.manager.save(user));

  ctx.body = err || res;
});

export default useRouter;
