import mongoose, { Document, Model, Schema } from "mongoose";

interface ISkirt extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  waist: number;
  hips: number;
  legCircumference: number;
  length: number;
  designSpecifications: {
	description: string;
	imageUrl?: string; // Optional: Use if there's an image upload
  };
}

const skirtSchema: Schema<ISkirt> = new mongoose.Schema({
  userId: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'User',
	required: true,
  },
  waist: {
	type: Number,
	required: [true, "Waist measurement is required"],
  },
  hips: {
	type: Number,
	required: [true, "Hips measurement is required"],
  },
  legCircumference: {
	type: Number,
	required: [true, "Leg circumference measurement is required"],
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

const SkirtModel: Model<ISkirt> = mongoose.model("Skirt", skirtSchema);

export default SkirtModel;