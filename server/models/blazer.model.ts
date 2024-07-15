import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBlazer extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  chest: number;
  sleeve: number;
  waist: number;
  shoulders: number;
  length: number;
  designSpecifications: {
    description: string;
    imageUrl: string; // Optional: Use if there's an image upload
  };
}

const blazerSchema: Schema<IBlazer> = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chest: {
    type: Number,
    required: [true, "Chest measurement is required"],
  },
  sleeve: {
    type: Number,
    required: [true, "Sleeve measurement is required"],
  },
  waist: {
    type: Number,
    required: [true, "Waist measurement is required"],
  },
  shoulders: {
    type: Number,
    required: [true, "Shoulders measurement is required"],
  },
  length: {
    type: Number,
    required: [true, "Length measurement is required"],
  },
  designSpecifications: {
    description: {
      type: String,
      required: [true, "Design specifications are required"],
    },
    imageUrl: String, // This field is optional
  },
}, { timestamps: true });

const BlazerModel: Model<IBlazer> = mongoose.model("Blazer", blazerSchema);

export default BlazerModel;