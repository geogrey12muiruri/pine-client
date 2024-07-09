import mongoose, { Document, Model, Schema } from "mongoose";

interface IDress extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    bust: number;
    underBust: number;
    waist: number;
    hips: number;
    fullLength: number;
    lengthFromWaist: number;
    lengthFromArmpits: number;
    sleeves?: {
        armLength: number;
        bicepsCircumference: number;
        elbowCircumference: number;
        wristCircumference: number;
    };
    designSpecifications: {
        description: string;
        imageUrl?: string; // Optional: Use if there's an image upload
    };
}

const dressSchema: Schema<IDress> = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bust: {
        type: Number,
        required: [true, "Bust measurement is required"],
    },
    underBust: {
        type: Number,
        required: [true, "Under-bust measurement is required"],
    },
    waist: {
        type: Number,
        required: [true, "Waist measurement is required"],
    },
    hips: {
        type: Number,
        required: [true, "Hips measurement is required"],
    },
    fullLength: {
        type: Number,
        required: [true, "Full length measurement is required"],
    },
    lengthFromWaist: {
        type: Number,
        required: [true, "Length from waist measurement is required"],
    },
    lengthFromArmpits: {
        type: Number,
        required: [true, "Length from armpits measurement is required"],
    },
    sleeves: {
        armLength: Number,
        bicepsCircumference: Number,
        elbowCircumference: Number,
        wristCircumference: Number,
    },
    designSpecifications: {
        description: {
            type: String,
            required: [true, "Design specifications are required"],
        },
        imageUrl: String, // This field is optional
    },
}, { timestamps: true });

const DressModel: Model<IDress> = mongoose.model("Dress", dressSchema);

export default DressModel;