import { NextFunction, Request, Response } from "express";
import ErrorHandler, { catchAsyncErrors } from "../middleware/errorMiddleware";
import { generateToken } from "../utils/jwtToken";
import User from "../models/UsersModel";
import { comparePassword } from "../shared/helpers";

export const login = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { mobileNumber, password } = req.body;

    const user = await User.findOne({
      where: { mobileNumber },
    });

    if (!user)
      return next(new ErrorHandler("Wrong mobile number or password", 404));

    const correctPassword = await comparePassword(password, user.password);

    if (!correctPassword)
      return next(new ErrorHandler("Wrong mobile number or password", 400));

    generateToken(user, "User login successfully", 200, res);
  }
);

export const verifyToken = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({
      success: true,
      userId: req.userId,
    });
  }
);

export const getUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    const user = await User.findByPk(userId);

    if (!user) return next(new ErrorHandler("User not found", 400));

    res.json(user);
  }
);

export const logout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["adminToken"]
      ? "adminToken"
      : req.cookies["testerToken"]
      ? "testerToken"
      : req.cookies["mainTesterToken"]
      ? "mainTesterToken"
      : "secrterToken";

    res
      .status(200)
      .cookie(token, "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "User Logged Out Successfully",
      });
  }
);
