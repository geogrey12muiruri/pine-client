import { Request, Response, NextFunction } from 'express';
import SkirtModel from '../models/skirt.model';
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

interface ICreateSkirtBody {
  userId: string; // Assuming userId is a string. Adjust the type as necessary.
  waist: number;
  hips: number;
  legCircumference: number;
  length: number;
  designDescription: string;
  designImageUrl?: string;
}

export const createSkirtMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body as ICreateSkirtBody;

      // Check if a skirt measurement already exists for the user
      const existingMeasurement = await SkirtModel.findOne({ userId });
      if (existingMeasurement) {
        return res.status(400).json({
          success: false,
          message: "User already has a skirt measurement.",
        });
      }

      // Destructure all required fields from req.body
      const { waist, hips, legCircumference, length, designDescription, designImageUrl } = req.body;

      // Create the skirt measurement since no existing record was found
      const skirt = await SkirtModel.create({
        waist,
        hips,
        legCircumference,
        length,
        designSpecifications: {
          description: designDescription,
          imageUrl: designImageUrl,
        },
        userId
      });

      res.status(201).json({
        success: true,
        skirt,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getSkirtMeasurementById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const skirt = await SkirtModel.findById(req.params.id);
    if (!skirt) {
      return next(new ErrorHandler("Skirt measurement not found", 404));
    }
    res.status(200).json({
      success: true,
      skirt,
    });
  }
);

export const getAllSkirtMeasurements = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const skirts = await SkirtModel.find();
    res.status(200).json({
      success: true,
      skirts,
    });
  }
);

export const updateSkirtMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let skirt = await SkirtModel.findById(req.params.id);
    if (!skirt) {
      return next(new ErrorHandler("Skirt measurement not found", 404));
    }

    skirt = await SkirtModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      skirt,
    });
  }
);

export const deleteSkirtMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const skirt = await SkirtModel.findById(req.params.id);
    if (!skirt) {
      return next(new ErrorHandler("Skirt measurement not found", 404));
    }

    await SkirtModel.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Skirt measurement deleted",
    });
  }
);
