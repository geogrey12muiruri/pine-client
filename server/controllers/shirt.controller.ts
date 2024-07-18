import { Request, Response, NextFunction } from "express";
import shirtModel, { IShirt } from "../models/shirt.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { getShirtByIdService, getAllShirtsService } from "../services/shirt.service";

// Create shirt measurement
interface ICreateShirtBody {
  userId: string; // Assuming userId is a string. Adjust the type as necessary.
  neckRound: number;
  sleeve: number;
  shoulder: number;
  chest: number;
  shirtLength: number;
  bicepsAround: number;
  wristAround: number;
  waist: number;
  designDescription: string;
  designImageUrl?: string;
}

export const createShirtMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body as ICreateShirtBody;

      // Check if a shirt measurement already exists for the user
      const existingMeasurement = await shirtModel.findOne({ userId });
      if (existingMeasurement) {
        return res.status(400).json({
          success: false,
          message: "User already has a shirt measurement.",
        });
      }

      // Destructure all required fields from req.body
      const { neckRound, sleeve, shoulder, chest, shirtLength, bicepsAround, wristAround, waist} = req.body;

      // Create the shirt measurement since no existing record was found
      const shirt = await shirtModel.create({
        neckRound,
        sleeve,
        shoulder,
        chest,
        shirtLength,
        bicepsAround,
        wristAround,
        waist,
        // designDescription,
        // designImageUrl,
        userId
      });

      res.status(201).json({
        success: true,
        shirt,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update shirt measurement
interface IUpdateShirtBody {
  neckRound?: number;
  sleeve?: number;
  shoulder?: number;
  chest?: number;
  shirtLength?: number;
  bicepsAround?: number;
  wristAround?: number;
//   designDescription?: string;
//   designImageUrl?: string;
}

export const updateShirtMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { neckRound, sleeve, shoulder, chest, shirtLength, bicepsAround, wristAround, } = req.body as IUpdateShirtBody;
      const { id } = req.params;

      const shirt = await shirtModel.findById(id);

      if (!shirt) {
        return next(new ErrorHandler("Shirt not found", 404));
      }

      if (neckRound !== undefined) shirt.neckRound = neckRound;
      if (sleeve !== undefined) shirt.sleeve = sleeve;
      if (shoulder !== undefined) shirt.shoulder = shoulder;
      if (chest !== undefined) shirt.chest = chest;
      if (shirtLength !== undefined) shirt.shirtLength = shirtLength;
      if (bicepsAround !== undefined) shirt.bicepsAround = bicepsAround;
      if (wristAround !== undefined) shirt.wristAround = wristAround;
    //   if (designDescription !== undefined) (shirt as IShirt).designDescription = designDescription;
    //   if (designImageUrl !== undefined) (shirt as IShirt).designImageUrl = designImageUrl;

      await shirt.save();

      res.status(200).json({
        success: true,
        shirt,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get shirt measurement by ID
export const getShirtMeasurementById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      getShirtByIdService(id, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get all shirt measurements
export const getAllShirtMeasurements = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllShirtsService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Delete shirt measurement
export const deleteShirtMeasurement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const shirt = await shirtModel.findById(id);

      if (!shirt) {
        return next(new ErrorHandler("Shirt not found", 404));
      }

      await shirt.deleteOne({ _id: id });

      res.status(200).json({
        success: true,
        message: "Shirt measurement deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
