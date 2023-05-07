import { db } from '../config/db';
import { initModels } from '../models/init-models';

const models = initModels(db);  

export class FlightService {

    constructor(){}

    async findFlightsById(id: number | string) {
        return await models.flight.findOne({
            where: {flight_id: id},
            attributes: [
                ['flight_id', 'flightId'], 
                ['takeoff_date_time', 'takeoffDateTime'],
                ['takeoff_airport', 'takeoffAirport'],
                ['landing_date_time', 'landingDateTime'],
                ['landing_airport', 'landingAirport'],
                ['airplane_id', 'airplaneId']
            ],
            include:[
                {
                    model: models.boardingPass,
                    as: 'boarding_passes',
                    attributes: [
                        ['passenger_id', 'passengerId'],
                        ['boarding_pass_id', 'boardingPassId'],
                        ['purchase_id', 'purchaseId'],
                        ['seat_type_id', 'seatTypeId'],
                        ['seat_id', 'seatId'],
                        //[db.col('passenger.name'), 'name']
                    ],
                    include: [
                        {
                            model: models.passenger,
                            as: 'passenger',
                            //attributes: []
                        }
                    ]
                }
            ]
        });
    }
}