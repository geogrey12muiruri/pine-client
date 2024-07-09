import mongoose, { Document, Model, Schema } from "mongoose";

interface IShirt extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    neckRound: number;
    sleeve: number;
    shoulder: number;
    chest: number;
    shirtLength: number;
    bicepsAround: number;
    wristAround: number;
    designSpecifications: {
        description: string;
        imageUrl?: string; // Optional: Use if there's an image upload
    };
}

const shirtSchema: Schema<IShirt> = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    neckRound: {
        type: Number,
        required: [true, "Neck round measurement is required"],
    },
    sleeve: {
        type: Number,
        required: [true, "Sleeve measurement is required"],
    },
    shoulder: {
        type: Number,
        required: [true, "Shoulder measurement is required"],
    },
    chest: {
        type: Number,
        required: [true, "Chest measurement is required"],
    },
    shirtLength: {
        type: Number,
        required: [true, "Shirt length measurement is required"],
    },
    bicepsAround: {
        type: Number,
        required: [true, "Biceps around measurement is required"],
    },
    wristAround: {
        type: Number,
        required: [true, "Wrist around measurement is required"],
    },
    designSpecifications: {
        description: {
            type: String,
            required: [true, "Design specifications are required"],
        },
        imageUrl: String, // This field is optional
    },
}, { timestamps: true });

const ShirtModel: Model<IShirt> = mongoose.model("Shirt", shirtSchema);

export default ShirtModel;