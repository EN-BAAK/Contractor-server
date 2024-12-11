import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/errorMiddleware";
import User from "../models/UsersModel";
import { Op } from "sequelize";

export const getTestersFullNameID = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const testers = await User.findAll({
      attributes: ["fullName", "id"],
      where: {
        [Op.or]: [{ role: "tester" }, { role: "mainTester" }],
      },
    });

    res.status(200).json({
      success: true,
      users: testers,
    });
  }
);
