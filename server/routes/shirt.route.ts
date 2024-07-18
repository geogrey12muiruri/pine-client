import express from 'express';
import {
  getShirtMeasurementById,
  getAllShirtMeasurements,
  createShirtMeasurement,
  updateShirtMeasurement,
  deleteShirtMeasurement,
} from '../controllers/shirt.controller';

const shirtRouter = express.Router();

shirtRouter.get('/shirts/:id', getShirtMeasurementById);
shirtRouter.get('/shirts', getAllShirtMeasurements);
shirtRouter.post('/shirts', createShirtMeasurement);
shirtRouter.put('/shirts/:id', updateShirtMeasurement);
shirtRouter.delete('/shirts/:id', deleteShirtMeasurement);

export default shirtRouter;
