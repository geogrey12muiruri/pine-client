import mongoose, { Document, Model, Schema } from "mongoose";

interface IHalfCoat extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  length: number;
  shoulder: number;
  waist: number;
  designSpecifications: {
    description: string;
    imageUrl?: string; // Optional: Use if there's an image upload
  };
}

const halfCoatSchema: Schema<IHalfCoat> = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  length: {
    type: Number,
    required: [true, "Length measurement is required"],
  },
  shoulder: {
    type: Number,
    required: [true, "Shoulder measurement is required"],
  },
  waist: {
    type: Number,
    required: [true, "Waist measurement is required"],
  },
  designSpecifications: {
    description: {
      type: String,
      required: [true, "Design specifications are required"],
    },
    imageUrl: String, // This field is optional
  },
}, { timestamps: true });

const HalfCoatModel: Model<IHalfCoat> = mongoose.model("HalfCoat", halfCoatSchema);

export default HalfCoatModel;
