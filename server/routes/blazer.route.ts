import express from 'express';
import {
  getBlazerMeasurementById,
  getAllBlazerMeasurements,
  createBlazerMeasurement,
  updateBlazerMeasurement ,
  deleteBlazerMeasurement
} from '../controllers/blazer.controller';

const blazerRouter = express.Router();

blazerRouter.get('/blazers/:id', getBlazerMeasurementById);
blazerRouter.get('/blazers', getAllBlazerMeasurements);
blazerRouter.post('/blazers', createBlazerMeasurement);
blazerRouter.put('/blazers/:id', updateBlazerMeasurement);
blazerRouter.delete('/blazers/:id', deleteBlazerMeasurement);

export default blazerRouter;
