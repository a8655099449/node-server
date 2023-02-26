import Router from "koa-router";
import useRouter from "./user";
const router = new Router();

router.use(async (ctx, next) => {
  ctx.type = "application/json";
  await next();
});

router.use(`/user`,useRouter.routes());

export default router;
