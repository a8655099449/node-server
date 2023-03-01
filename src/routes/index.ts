import Router from "koa-router";
import useRouter from "./userRoute";
import fileRouter from "./file";
const router = new Router();

router.use(async (ctx, next) => {
  ctx.type = "application/json";
  await next();
});

router.use(`/user`,useRouter.routes());
router.use(`/file`,fileRouter.routes());

export default router;
