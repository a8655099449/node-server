import crypto from "crypto";

import jwt from "jsonwebtoken";
import { User } from "../entities/User";

export const md5 = (s: string) =>
  crypto.createHash("md5").update(s).digest("hex");

export const JWT_SECRET = "JWT_SECRET";

export const signToken = (payload: any) => md5(Math.random().toString());

export const decodeJwt = (token: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res as User);
      }
    });
  });
};
