import express from 'express';
import {
  getHalfCoatMeasurementById,
  getAllHalfCoatMeasurements,
  createHalfCoatMeasurement,
  updateHalfCoatMeasurement,
  deleteHalfCoatMeasurement
} from '../controllers/halfcoat.controller';

const halfCoatRouter = express.Router();

halfCoatRouter.get('/halfcoats/:id', getHalfCoatMeasurementById);
halfCoatRouter.get('/halfcoats', getAllHalfCoatMeasurements);
halfCoatRouter.post('/halfcoats', createHalfCoatMeasurement);
halfCoatRouter.put('/halfcoats/:id', updateHalfCoatMeasurement);
halfCoatRouter.delete('/halfcoats/:id', deleteHalfCoatMeasurement);

export default halfCoatRouter;
