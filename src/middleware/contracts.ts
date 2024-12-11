import { NextFunction, Request, Response } from "express";
import ErrorHandler, { catchAsyncErrors } from "./errorMiddleware";
import { validationResult } from "express-validator";

export const addReNewValidation = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, companyName, phone, city, location, notes, locationLink } =
      req.body;
    const results = validationResult(req);

    if (!name && !companyName && !phone && !city && !location)
      return next(new ErrorHandler("Please provide all details", 400));

    if (!results.isEmpty()) {
      const errors = results.array().map((error) => error.msg);
      return next(new ErrorHandler(errors, 400));
    }

    if (notes && notes.length > 500)
      return next(
        new ErrorHandler("The notes should be less than 500 letters", 400)
      );

    if (locationLink && locationLink.least > 200)
      return next(new ErrorHandler("The location link is too long", 400));

    next();
  }
);
