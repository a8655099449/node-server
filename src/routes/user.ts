import AppDataSource from "../db";
import { User } from "../entities/User";

import Router from "koa-router";
const useRouter = new Router();

useRouter.get("/all", async (ctx, next) => {
  ctx.body = await AppDataSource.manager.find(User);
});
useRouter.post("/create", async (ctx, next) => {

  const user = new User()
  

  ctx.body = ctx.request.body
});

export default useRouter;
