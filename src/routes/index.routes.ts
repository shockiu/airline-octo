// importtar controlador 
import { Router } from 'express';
import { URLS } from '../utils/urls';
import { flightController } from '../controllers/flightController';

const routes = Router();

routes.get(URLS.flightsIdPassengers, flightController);


export {routes};