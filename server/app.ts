require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
// import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";
import { rateLimit } from "express-rate-limit";
import blazerRouter from './routes/blazer.route'; // Import blazer routes
import trouserRouter from './routes/trouser.route'; // Import trouser routes  
import shirtRouter from "./routes/shirt.route";
import halfCoatRouter from "./routes/halfcoat.route";
import skirtRouter from "./routes/skirt.route";
import dressRouter from "./routes/dress.route";

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// Declare allowedOrigins variable
const allowedOrigins = ["http://localhost:8081", "http://localhost:8000", "http://localhost:3000"];

// cors => cross origin resource sharing
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  }
}));

// api requests limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// routes
app.use(
  "/api/v1",
  userRouter,
  // orderRouter,
  courseRouter,
  blazerRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter,
  trouserRouter,
  shirtRouter,
  halfCoatRouter,
  skirtRouter,
  dressRouter
);


// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    succcess: true,
    message: "API is working",
  });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// // middleware calls
app.use(limiter);
app.use(ErrorMiddleware);
