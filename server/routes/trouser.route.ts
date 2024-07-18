import express from 'express';
import {
  getTrouserMeasurementById,
  getAllTrouserMeasurements,
  createTrouserMeasurement,
  updateTrouserMeasurement,
  deleteTrouserMeasurement
} from '../controllers/trouser.controller';

const trouserRouter = express.Router();

trouserRouter.get('/trousers/:id', getTrouserMeasurementById);
trouserRouter.get('/trousers', getAllTrouserMeasurements);
trouserRouter.post('/trousers', createTrouserMeasurement);
trouserRouter.put('/trousers/:id', updateTrouserMeasurement);
trouserRouter.delete('/trousers/:id', deleteTrouserMeasurement);

export default trouserRouter;
