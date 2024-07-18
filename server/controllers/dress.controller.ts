import { Request, Response, NextFunction } from 'express';
import DressModel from '../models/dress.model';
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler"; // Import the ErrorHandler class from the appropriate module


interface ICreateDressBody {
  userId: string; // Assuming userId is a string. Adjust the type as necessary.
  bust: number;
  underBust: number;
  waist: number;
  hips: number;
  fullLength: number;
  lengthFromWaist: number;
  lengthFromArmpits: number;
  armLength?: number;
  bicepsCircumference?: number;
  elbowCircumference?: number;
  wristCircumference?: number;
  designDescription: string;
  designImageUrl?: string;
}

export const createDressMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body as ICreateDressBody;

      // Check if a dress measurement already exists for the user
      const existingMeasurement = await DressModel.findOne({ userId });
      if (existingMeasurement) {
        return res.status(400).json({
          success: false,
          message: "User already has a dress measurement.",
        });
      }

      // Destructure all required fields from req.body
      const {
        bust, underBust, waist, hips, fullLength, lengthFromWaist, lengthFromArmpits,
        armLength, bicepsCircumference, elbowCircumference, wristCircumference,
        designDescription, designImageUrl
      } = req.body;

      // Create the dress measurement since no existing record was found
      const dress = await DressModel.create({
        bust,
        underBust,
        waist,
        hips,
        fullLength,
        lengthFromWaist,
        lengthFromArmpits,
        sleeves: {
          armLength,
          bicepsCircumference,
          elbowCircumference,
          wristCircumference,
        },
        designSpecifications: {
          description: designDescription,
          imageUrl: designImageUrl,
        },
        userId
      });

      res.status(201).json({
        success: true,
        dress,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getDressMeasurementById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const dress = await DressModel.findById(req.params.id);
    if (!dress) {
      return next(new ErrorHandler("Dress measurement not found", 404));
    }
    res.status(200).json({
      success: true,
      dress,
    });
  }
);

export const getAllDressMeasurements = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const dresses = await DressModel.find();
    res.status(200).json({
      success: true,
      dresses,
    });
  }
);

export const updateDressMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let dress = await DressModel.findById(req.params.id);
    if (!dress) {
      return next(new ErrorHandler("Dress measurement not found", 404));
    }

    dress = await DressModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      dress,
    });
  }
);

export const deleteDressMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const dress = await DressModel.findById(req.params.id);
    if (!dress) {
      return next(new ErrorHandler("Dress measurement not found", 404));
    }

    await dress.remove();

    res.status(200).json({
      success: true,
      message: "Dress measurement deleted",
    });
  }
);
