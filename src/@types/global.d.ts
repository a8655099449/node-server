import { ParameterizedContext } from "koa";
import Router from "koa-router";

declare global {
  type Context = ParameterizedContext<
    any,
    Router.IRouterParamContext<any, {}>,
    any
  >;
}
