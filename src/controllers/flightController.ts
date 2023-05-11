import { FlightService } from '../services/flightsService';
import { URLS } from '../utils/urls';
import { MESSAGES, STATUS, responseService } from '../utils/response';
import { Router } from  'express';

export const flightController = Router();
const flightsService = new FlightService();

flightController.get(URLS.flightsIdPassengers, async (req, res) => {
    flightsService.findFlightsById(req.params.id)
    .then((response) => {
        const {errors, ...rest} = responseService( STATUS('success'), response)
        res.status(rest.code).send(rest);
    })
    .catch((err) => {
        console.log(err)
        if (err.message && err.resposneDb) {
            const { errors, ...rest } = responseService( STATUS(err.message), err.resposneDb)
            res.status(rest.code).send(rest);
        } else {
            const { data, ...rest }  = responseService( STATUS(null), null, MESSAGES(null))
            res.status(rest.code).send(rest);
        }
    })
})

