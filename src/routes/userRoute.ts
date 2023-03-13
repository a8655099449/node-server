import AppDataSource from "../db";
import { User } from "../entities/User";

import Router from "koa-router";
import to from "../utils/await";
import { failResponse, successResponse, validateData } from "../utils/response";
import { decodeJwt, md5, signToken } from "../utils";
const userRouter = new Router();

userRouter.get("/all", async (ctx) => {
  ctx.body = await AppDataSource.manager.find(User);
});
userRouter.post("/create", async (ctx) => {
  const user = AppDataSource.getRepository(User).create(
    ctx.request.body as object
  );

  const vRes = await validateData(user, ctx);

  user.password = md5(user.password);
  if (!vRes) {
    return;
  }

  const [err, res] = await to(AppDataSource.manager.save(user));

  if (err) {
    failResponse(ctx, { data: err });
    return;
  }
  successResponse(ctx, { data: { res, user } });
});
userRouter.post("/login", async (ctx) => {
  const data = ctx.request.body;

  const { account, password } = data;

  const [err, res] = await to(
    AppDataSource.getRepository(User).findOne({
      where: { account, password },
    })
  );

  if (err || !res) {
    failResponse(ctx, {
      message: "账号密码错误",
      data: err,
    });

    return;
  }
  const token = signToken(res.toApi());

  successResponse(ctx, {
    data: {
      user: res.toApi(),
      token,
    },
  });

  AppDataSource.getRepository(User).update(
    { id: res.id },
    {
      token,
    }
  );
});

userRouter.get("/status", async (ctx) => {
  const Authorization = ctx.request.header.authorization;
  const [err, info] = await to(decodeJwt(Authorization));
  if (err) {
    failResponse(ctx, { code: 401 });
    return;
  }
  successResponse(ctx, { data: info });
});

userRouter.get("/list", async (ctx) => {
  const query: any = ctx.query;
  const { page = 1, pageSize = 10, name =''} = query;

  const users = await User.paginate<User>(Number(page), Number(pageSize), {
    wheres: [
      {
        key: "name",
        type: "like",
        value: name,
      },
    ],
  });

  users.items = users.items.map((item) => item.toApi()) as any;

  successResponse(ctx, {
    data: users,
  });
});

export default userRouter;
