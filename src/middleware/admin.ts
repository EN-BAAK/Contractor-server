import { NextFunction, Request, Response } from "express";
import ErrorHandler, { catchAsyncErrors } from "./errorMiddleware";
import { validationResult } from "express-validator";

export const addUserValidation = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { mobileNumber, password, fullName, role } = req.body;
    const results = validationResult(req);

    if (!mobileNumber && !password && !fullName && !role)
      return next(new ErrorHandler("Please provide all details!", 400));

    if (!results.isEmpty()) {
      const errors = results.array().map((error) => error.msg);
      return next(new ErrorHandler(errors, 400));
    }

    next();
  }
);

export const editUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { mobileNumber, password } = req.body;

    if (mobileNumber && mobileNumber <= 20)
      return next(
        new ErrorHandler(
          "Mobile number should be less then or equal 20 letters",
          400
        )
      );

    if (password && String(password).length > 50)
      return next(
        new ErrorHandler(
          "Password should be less then or equal 50 letters",
          400
        )
      );

    next();
  }
);

export const addContractsValidation = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { renews, date, tester_name } = req.body;

    const arrayRenews = Array.from(renews);

    if (!arrayRenews.length || !date || !tester_name)
      return next(new ErrorHandler("Please provide all details", 400));

    next();
  }
);
