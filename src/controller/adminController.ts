import { NextFunction, Request, Response } from "express";
import ErrorHandler, { catchAsyncErrors } from "../middleware/errorMiddleware";
import { hashPassword } from "../shared/helpers";
import User from "../models/UsersModel";
import Contract from "../models/ContractsModel";
import Renew from "../models/RenewsModel";
import { Op } from "sequelize";

export const addUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, mobileNumber, password, role } = req.body;

    const existingUser = await User.findOne({ where: { mobileNumber } });

    if (existingUser) {
      return next(new ErrorHandler("This account already exists", 400));
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      fullName,
      mobileNumber,
      role,
      password: hashedPassword,
    });

    res.status(200).json({ success: true, user: newUser });
  }
);

export const deleteUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const user = await User.findOne({ where: { id } });

    if (!user || user.role === "admin") {
      return next(new ErrorHandler("Internal server error", 500));
    }

    await user.destroy();

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  }
);

export const editUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, password, role, mobileNumber } = req.body;
    const id = req.params.id;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return next(new ErrorHandler("Internal server error", 500));
    }

    const hashedPassword = password
      ? await hashPassword(password)
      : user.password;

    await user.update({
      fullName: fullName || user.fullName,
      mobileNumber: mobileNumber || user.mobileNumber,
      role: role || user.role,
      password: hashedPassword,
    });

    res
      .status(200)
      .json({ success: true, message: "User edited successfully" });
  }
);

export const getUsers = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.findAll({ where: { role: { [Op.ne]: "admin" } } });

    res.status(200).json({ success: true, users });
  }
);

export const addContracts = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { renews, date, tester_name, order } = req.body;
    const testerId = req.params.testerId;

    await Promise.all(
      renews.map(async (item: any) => {
        const renew = await Renew.findByPk(item.id);

        if (renew) {
          await renew.destroy();

          const newContract = {
            ...item,
            tester_id: Number(testerId),
            done: "false",
            date,
            order,
            tester_name,
          };

          await Contract.create(newContract);
        }
      })
    );

    res
      .status(200)
      .json({ success: true, message: "Contracts added successfully" });
  }
);

export const editContracts = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const contacts = req.body;

    const contract = await Contract.findByPk(contacts.id);

    if (!contract) {
      return next(new ErrorHandler("Contract not found", 404));
    }

    await contract.update(contacts);

    res
      .status(200)
      .json({ success: true, message: "Contracts edited successfully" });
  }
);

export const deleteContacts = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const contract = await Contract.findByPk(id);

    if (!contract) {
      return next(new ErrorHandler("Contract not found", 404));
    }

    await contract.destroy();

    res
      .status(200)
      .json({ success: true, message: "Contracts deleted successfully" });
  }
);

export const deleteAllContacts = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    await Contract.destroy({ truncate: true });

    res
      .status(200)
      .json({ success: true, message: "Contracts deleted successfully" });
  }
);

export const getUnFinishedContracts = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const contracts = await Contract.findAll({ where: { done: "false" } });

    res.status(200).json({ success: true, contracts });
  }
);

export const getFinishedContracts = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const contracts = await Contract.findAll({ where: { done: "true" } });

    res.status(200).json({ success: true, contracts });
  }
);
