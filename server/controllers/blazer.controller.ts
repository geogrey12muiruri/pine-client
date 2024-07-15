require("dotenv").config();
import { Request, Response, NextFunction } from "express";

interface CustomRequest {
  user?: any;
}

declare module "express" {
  export interface Request extends CustomRequest {}
}

import blazerModel, { IBlazer } from "../models/blazer.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { getBlazerByIdService, getAllBlazersService } from "../services/blazer.service";

// Create blazer measurement
interface ICreateBlazerBody {
    userId: string; // Assuming userId is a string. Adjust the type as necessary.
    chest: number;
    waist: number;
    length: number;
    sleeve: number;
    shoulders: number;
    designSpecifications: {
      description: string;
      imageUrl?: string; // Optional field
    };
  }

  export const createBlazerMeasurement = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // Destructure all required fields from req.body
        const { chest, waist, length, sleeve, shoulders, designSpecifications, userId } = req.body as ICreateBlazerBody;
  
        // Ensure all required fields are included in the blazerModel.create method
        const blazer = await blazerModel.create({
          chest,
          waist,
          length,
          sleeve,
          shoulders,
          designSpecifications,
          userId
        });
  
        res.status(201).json({
          success: true,
          blazer,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );
// Update blazer measurement
interface IUpdateBlazerBody {
  chest?: number;
  waist?: number;
  length?: number;
  sleeve?: number;
}

export const updateBlazerMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { chest, waist, length, sleeve } = req.body as IUpdateBlazerBody;
      const { id } = req.params;

      const blazer = await blazerModel.findById(id);

      if (!blazer) {
        return next(new ErrorHandler("Blazer not found", 404));
      }

      if (chest !== undefined) blazer.chest = chest;
      if (waist !== undefined) blazer.waist = waist;
      if (length !== undefined) blazer.length = length;
      if (sleeve !== undefined) blazer.sleeve = sleeve;

      await blazer.save();

      res.status(200).json({
        success: true,
        blazer,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get blazer measurement by ID
export const getBlazerMeasurementById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      getBlazerByIdService(id, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get all blazer measurements
export const getAllBlazerMeasurements = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllBlazersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Delete blazer measurement
export const deleteBlazerMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const blazer = await blazerModel.findById(id);

      if (!blazer) {
        return next(new ErrorHandler("Blazer not found", 404));
      }

      await blazer.deleteOne({ _id: id });

      res.status(200).json({
        success: true,
        message: "Blazer measurement deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
