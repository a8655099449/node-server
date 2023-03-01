import { validate } from "class-validator";
import to from "./await";
import { BaseContext } from "../@types/global";

export const validateData = async (target: any, ctx: BaseContext) => {
  const [err1, res1] = await to(validate(target));

  if (res1.length > 0 || err1) {
    const message = Object.values(res1[0].constraints).join(";");
    failResponse(ctx, {
      message,
      data: res1 || err1,
    });

    return false;
  }

  return true;
};

export const successResponse = (
  ctx: BaseContext,
  { message = "ok", data = null as any} = {}
) => {
  ctx.status = 200;

  ctx.body = {
    code: 200,
    data,
    message,
  };
};

export const failResponse = (
  ctx: BaseContext,
  { message = "server error", data = null as any ,code = 500}
) => {
  ctx.status = code;

  ctx.body = {
    code: code,
    data,
    message,
  };
};
