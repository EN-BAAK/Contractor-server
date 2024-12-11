import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/errorMiddleware";
import Renew from "../models/RenewsModel";
import Contract from "../models/ContractsModel";

export const addReNews = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      companyName,
      city,
      location,
      locationLink,
      phone,
      notes,
      creator,
    } = req.body;

    const newRenews = {
      name,
      companyName,
      city,
      phone,
      location,
      locationLink: locationLink || null,
      notes: notes || null,
      creator,
    };

    const createdRenew = await Renew.create(newRenews);

    res.status(200).json({ success: true, renews: createdRenew });
  }
);

export const getRenews = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const renews = await Renew.findAll();

    res.status(200).json({ success: true, renews });
  }
);

export const deleteReNews = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const renewId = req.params.id;

    await Renew.destroy({ where: { id: renewId }, limit: 1 });

    res.status(200).json({
      success: true,
      message: "The renew item deleted successfully",
    });
  }
);

export const editReNews = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, companyName, city, location, locationLink, phone, notes } =
      req.body;
    const renewId = req.params.id;

    const updatedRenew = {
      name,
      companyName,
      city,
      phone,
      location,
      locationLink: locationLink || null,
      notes: notes || null,
    };

    await Renew.update(updatedRenew, { where: { id: renewId }, limit: 1 });

    res.status(200).json({
      success: true,
      message: "The renew item edited successfully",
    });
  }
);

export const doneContract = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    await Contract.update({ done: "true" }, { where: { id }, limit: 1 });

    res
      .status(200)
      .json({ success: true, message: "Contracts done successfully" });
  }
);

export const unDoneContract = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    await Contract.update({ done: "false" }, { where: { id }, limit: 1 });

    res
      .status(200)
      .json({ success: true, message: "Contracts undone successfully" });
  }
);

export const selectUnDoneContracts = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const contracts = await Contract.findAll({
      where: { tester_id: id, done: "false" },
    });

    res.status(200).json({ success: true, contracts });
  }
);

export const selectDoneContracts = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const contracts = await Contract.findAll({
      where: { tester_id: id, done: "true" },
    });

    res.status(200).json({ success: true, contracts });
  }
);
