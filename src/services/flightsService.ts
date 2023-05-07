import { db } from '../config/db';
import { initModels } from '../models/init-models';

const models = initModels(db);  

export class FlightService {

    constructor(){}

    async findFlightsById(id: number | string) {
        return await models.flight.findAll({
            where: {flight_id: id}
        });
    }
}