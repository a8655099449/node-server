import { ParameterizedContext } from "koa";
import Router from "koa-router";

export type BaseContext = ParameterizedContext<
any,
Router.IRouterParamContext<any, {}>,
any
>;