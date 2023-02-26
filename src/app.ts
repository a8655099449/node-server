import Koa from "koa";
import router from "./routes";
// import AppDataSource from "./db";
import { User } from "./entities/User";
import AppDataSource from "./db";
// import db from "./db";
import bodyParser from "koa-bodyparser";
const app = new Koa();

app.use(bodyParser());

const main = async () => {
  // 初始化数据库
  await AppDataSource.initialize();
  console.log("👴数据库初始化成功");
};

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log("server is running http://localhost:3000/");
});

main();
