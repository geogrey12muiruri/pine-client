import express from 'express';
import {
  getDressMeasurementById,
  getAllDressMeasurements,
  createDressMeasurement,
  updateDressMeasurement,
  deleteDressMeasurement
} from '../controllers/dress.controller';

const dressRouter = express.Router();

dressRouter.get('/dresses/:id', getDressMeasurementById);
dressRouter.get('/dresses', getAllDressMeasurements);
dressRouter.post('/dresses', createDressMeasurement);
dressRouter.put('/dresses/:id', updateDressMeasurement);
dressRouter.delete('/dresses/:id', deleteDressMeasurement);

export default dressRouter;
