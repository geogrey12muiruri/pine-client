import mongoose, { Document, Model, Schema } from "mongoose";

interface ITrouser extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  waist: number;
  length: number;
  thighs: number;
  hips: number;
  roundFly: number;
  legOpening: number;
  fly: string; // Assuming Fly is a string to describe the type of fly (e.g., zipper, button). Adjust as necessary.
}

const trouserSchema: Schema<ITrouser> = new mongoose.Schema({
  userId: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'User',
	required: true,
  },
  waist: {
	type: Number,
	required: [true, "Waist measurement is required"],
  },
  length: {
	type: Number,
	required: [true, "Length measurement is required"],
  },
  thighs: {
	type: Number,
	required: [true, "Thighs measurement is required"],
  },
  hips: {
	type: Number,
	required: [true, "Hips measurement is required"],
  },
  roundFly: {
	type: Number,
	required: [true, "RoundFly measurement is required"],
  },
  legOpening: {
	type: Number,
	required: [true, "LegOpening measurement is required"],
  },
  fly: {
	type: String,
	required: [true, "Fly type is required"],
  },
}, { timestamps: true });

const TrouserModel: Model<ITrouser> = mongoose.model("Trouser", trouserSchema);

export default TrouserModel;