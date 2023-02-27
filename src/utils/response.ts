import { validate } from "class-validator";
import to from "./await";

export const handleValidate = async (target:any) => {
  const [err1, res1] = await to(validate(target));
};

export const successResponse = () => {};

export const failResponse = () => {};
