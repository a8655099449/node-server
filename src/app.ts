import Koa from "koa";
import router from "./routes";
import AppDataSource from "./db";
import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import path from "path";
import { failResponse } from "./utils/response";

const app = new Koa();
const staticPath = path.resolve(__dirname, "../public");
app.use(serve(staticPath));

app.use(bodyParser({}));

const main = async () => {
  // 初始化数据库
  await AppDataSource.initialize();
  console.log("🥷  数据库初始化成功");
};

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    failResponse(ctx as any, {
      code: 404,
      message: "请求路径不存在: " + ctx.path,
    });
  }
});

app.listen(3000, () => {
  console.log("server is running http://localhost:3000/");
});

main();
