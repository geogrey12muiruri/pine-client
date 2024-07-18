import { Request, Response, NextFunction } from "express";
import trouserModel, { ITrouser } from "../models/trouser.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { getTrouserByIdService, getAllTrousersService } from "../services/trouser.service";

// Create trouser measurement
interface ICreateTrouserBody {
  userId: string; // Assuming userId is a string. Adjust the type as necessary.
  waist: number;
  length: number;
  thighs: number;
  hips: number;
  roundFly: number;
  legOpening: number;
  fly: string;
}

export const createTrouserMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body as ICreateTrouserBody;

      // Check if a trouser measurement already exists for the user
      const existingMeasurement = await trouserModel.findOne({ userId });
      if (existingMeasurement) {
        return res.status(400).json({
          success: false,
          message: "User already has a trouser measurement.",
        });
      }

      // Destructure all required fields from req.body
      const { waist, length, thighs, hips, roundFly, legOpening, fly } = req.body;

      // Create the trouser measurement since no existing record was found
      const trouser = await trouserModel.create({
        waist,
        length,
        thighs,
        hips,
        roundFly,
        legOpening,
        fly,
        userId
      });

      res.status(201).json({
        success: true,
        trouser,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update trouser measurement
interface IUpdateTrouserBody {
  waist?: number;
  length?: number;
  thighs?: number;
  hips?: number;
  roundFly?: number;
  legOpening?: number;
  fly?: string;
}

export const updateTrouserMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { waist, length, thighs, hips, roundFly, legOpening, fly } = req.body as IUpdateTrouserBody;
      const { id } = req.params;

      const trouser = await trouserModel.findById(id);

      if (!trouser) {
        return next(new ErrorHandler("Trouser not found", 404));
      }

      if (waist !== undefined) trouser.waist = waist;
      if (length !== undefined) trouser.length = length;
      if (thighs !== undefined) trouser.thighs = thighs;
      if (hips !== undefined) trouser.hips = hips;
      if (roundFly !== undefined) trouser.roundFly = roundFly;
      if (legOpening !== undefined) trouser.legOpening = legOpening;
      if (fly !== undefined) trouser.fly = fly;

      await trouser.save();

      res.status(200).json({
        success: true,
        trouser,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get trouser measurement by ID
export const getTrouserMeasurementById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      getTrouserByIdService(id, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get all trouser measurements
export const getAllTrouserMeasurements = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllTrousersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Delete trouser measurement
export const deleteTrouserMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const trouser = await trouserModel.findById(id);

      if (!trouser) {
        return next(new ErrorHandler("Trouser not found", 404));
      }

      await trouser.deleteOne({ _id: id });

      res.status(200).json({
        success: true,
        message: "Trouser measurement deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
