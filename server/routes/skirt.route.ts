import express from 'express';
import {
  getSkirtMeasurementById,
  getAllSkirtMeasurements,
  createSkirtMeasurement,
  updateSkirtMeasurement,
  deleteSkirtMeasurement
} from '../controllers/skirt.controller';

const skirtRouter = express.Router();

skirtRouter.get('/skirts/:id', getSkirtMeasurementById);
skirtRouter.get('/skirts', getAllSkirtMeasurements);
skirtRouter.post('/skirts', createSkirtMeasurement);
skirtRouter.put('/skirts/:id', updateSkirtMeasurement);
skirtRouter.delete('/skirts/:id', deleteSkirtMeasurement);

export default skirtRouter;
