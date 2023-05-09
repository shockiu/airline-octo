import { FlightService } from '../services/flightsService';
import { URLS } from '../utils/urls';
import { Router } from  'express';

export const flightController = Router();
const flightsService = new FlightService();

flightController.get(URLS.flightsIdPassengers, async (req, res) => {
    flightsService.findFlightsById(req.params.id)
    .then((response) => {
        res.send(response);
    })
    .catch((err) => {
        res.send(err);
    })
})

