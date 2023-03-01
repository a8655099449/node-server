import crypto from "crypto";

import jwt from "jsonwebtoken";
import { User } from "../entities/User";

export const md5 = (s: string) =>
  crypto.createHash("md5").update(s).digest("hex");

export const JWT_SECRET = "JWT_SECRET";

export const signToken = (payload: any) =>
  jwt.sign(
    {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    JWT_SECRET
  );

export const decodeJwt = (token: string):Promise<User> => {
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
