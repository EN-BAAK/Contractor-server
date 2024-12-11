import { Response } from "express";
import { generateJsonWebToken } from "../shared/helpers";

export const generateToken = (
  user: any,
  message: string,
  statusCode: number,
  res: Response
) => {
  const token = generateJsonWebToken(user.id);
  const cookieName =
    user.role === "admin"
      ? "adminToken"
      : user.role === "tester"
      ? "testerToken"
      : user.role === "secretary"
      ? "secrterToken"
      : "mainTesterToken";
  const cookieEx = process.env.COOKIE_EXPIRE || 0;

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + Number(cookieEx) * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
