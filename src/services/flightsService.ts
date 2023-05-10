import { db } from '../config/db';
import { initModels } from '../models/init-models';

const models = initModels(db);  


export class FlightService {

    constructor(){}

    async findFlightsById(id: number | string) {
        const flight = await models.flight.findOne({
            where: {flight_id: id},
            attributes: [
                ['flight_id', 'flightId'], 
                ['takeoff_date_time', 'takeoffDateTime'],
                ['takeoff_airport', 'takeoffAirport'],
                ['landing_date_time', 'landingDateTime'],
                ['landing_airport', 'landingAirport'],
                ['airplane_id', 'airplaneId'],
            ]
        });
        if (!flight) throw { message: 'notFound', resposneDb: {} }


        const passengers = await models.boardingPass.findAll({
            where: {
                flight_id: id
            },
            attributes: [
                ['passenger_id', 'passengerId'],
                'passenger.dni',
                'passenger.name',
                'passenger.age',
                'passenger.country',
                ['boarding_pass_id', 'boardingPassId'],
                ['purchase_id', 'purchaseId'],
                ['seat_type_id', 'seatTypeId'],
                ['seat_id', 'seatId'],
            ],
            group: 'purchase_id', 
            raw: true,
            include: [
                {
                    model: models.passenger,
                    as: 'passenger',
                    attributes :[]
                }
            ]
        })
        const flightJson: any = flight?.toJSON();
        flightJson.passengers = passengers;
        return flightJson 
    }
}