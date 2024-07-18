import { Request, Response, NextFunction } from "express";
import halfCoatModel, { IHalfCoat } from "../models/halcoat.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

// Create half coat measurement
interface ICreateHalfCoatBody {
    userId: string; // Assuming userId is a string. Adjust the type as necessary.
    length: number;
    shoulder: number;
    waist: number;
    designDescription: string;
    designImageUrl?: string;
  }
  
  export const createHalfCoatMeasurement = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { userId } = req.body as ICreateHalfCoatBody;
  
        // Check if a half coat measurement already exists for the user
        const existingMeasurement = await halfCoatModel.findOne({ userId });
        if (existingMeasurement) {
          return res.status(400).json({
            success: false,
            message: "User already has a half coat measurement.",
          });
        }
  
        // Destructure all required fields from req.body
        const { length, shoulder, waist, designDescription, designImageUrl } = req.body;
  
        // Create the half coat measurement since no existing record was found
        const halfCoat = await halfCoatModel.create({
          length,
          shoulder,
          waist,
          designSpecifications: {
            description: designDescription,
            imageUrl: designImageUrl,
          },
          userId
        });
  
        res.status(201).json({
          success: true,
          halfCoat,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );


// Update half coat measurement
interface IUpdateHalfCoatBody {
  length?: number;
  shoulder?: number;
  waist?: number;
  designDescription?: string;
  designImageUrl?: string;
}

export const updateHalfCoatMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { length, shoulder, waist, designDescription, designImageUrl } = req.body as IUpdateHalfCoatBody;
      const { id } = req.params;

      const halfCoat = await halfCoatModel.findById(id);

      if (!halfCoat) {
        return next(new ErrorHandler("Half coat not found", 404));
      }

      if (length !== undefined) halfCoat.length = length;
      if (shoulder !== undefined) halfCoat.shoulder = shoulder;
      if (waist !== undefined) halfCoat.waist = waist;
      if (designDescription !== undefined) halfCoat.designSpecifications.description = designDescription;
      if (designImageUrl !== undefined) halfCoat.designSpecifications.imageUrl = designImageUrl;

      await halfCoat.save();

      res.status(200).json({
        success: true,
        halfCoat,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get half coat measurement by ID
export const getHalfCoatMeasurementById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const halfCoat = await halfCoatModel.findById(id);

      if (!halfCoat) {
        return next(new ErrorHandler("Half coat not found", 404));
      }

      res.status(200).json({
        success: true,
        halfCoat,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get all half coat measurements
export const getAllHalfCoatMeasurements = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const halfCoats = await halfCoatModel.find();

      res.status(200).json({
        success: true,
        halfCoats,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Delete half coat measurement
export const deleteHalfCoatMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const halfCoat = await halfCoatModel.findById(id);

      if (!halfCoat) {
        return next(new ErrorHandler("Half coat not found", 404));
      }

      await halfCoat.deleteOne({ _id: id });

      res.status(200).json({
        success: true,
        message: "Half coat measurement deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
