import { NextFunction, Request, Response } from "express";

class ErrorHandler extends Error {
  statusCode: number;
  type?: string;
  constructor(message: any, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleWare = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "Json web token is invalid, Try again";
    err = new ErrorHandler(message, 401);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Json web token is expired, Try again";
    err = new ErrorHandler(message, 401);
  }

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((err: any) => err.message)
        .join(" ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export const catchAsyncErrors = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
};

export default ErrorHandler;
