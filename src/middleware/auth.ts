import { NextFunction, Request, Response } from "express";
import ErrorHandler, { catchAsyncErrors } from "./errorMiddleware";
import { validationResult } from "express-validator";
import jwt, { JwtPayload } from "jsonwebtoken";

export const loginValidation = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { mobileNumber, password } = req.body;
    const results = validationResult(req);

    if (!mobileNumber && !password)
      return next(new ErrorHandler("Please provide all details!", 400));

    if (!results.isEmpty()) {
      const errors = results.array().map((error) => error.msg);
      return next(new ErrorHandler(errors, 400));
    }

    next();
  }
);

export const isAuthenticated = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies["adminToken"] ||
      req.cookies["testerToken"] ||
      req.cookies["secrterToken"] ||
      req.cookies["mainTesterToken"];

    if (!token) return next(new ErrorHandler("User not authenticated", 400));

    const decode = await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );

    req.userId = (decode as JwtPayload).id;

    next();
  }
);

export const isAdmin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["adminToken"];

    if (!token) return next(new ErrorHandler("Admin not authenticated", 400));

    const decode = await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );

    req.userId = (decode as JwtPayload).id;

    next();
  }
);

export const isTester = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies["testerToken"] ||
      req.cookies["adminToken"] ||
      req.cookies["mainTesterToken"];

    if (!token) return next(new ErrorHandler("Tester not authenticated", 400));

    const decode = await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );

    req.userId = (decode as JwtPayload).id;

    next();
  }
);

export const isResponser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["secrterToken"] || req.cookies["adminToken"];

    if (!token)
      return next(new ErrorHandler("responser not authenticated", 400));

    const decode = await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );

    req.userId = (decode as JwtPayload).id;

    next();
  }
);

export const isTesterAdmin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["mainTesterToken"];

    if (!token)
      return next(new ErrorHandler("adminTester not authenticated", 400));

    const decode = await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );

    req.userId = (decode as JwtPayload).id;

    next();
  }
);
