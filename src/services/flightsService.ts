import { db } from '../config/db';
import { initModels } from '../models/init-models';
import { PassengerBoardingPass, FlightPassengers, Seat } from '../interfaces/index';

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
        console.log(await this.findSeatOfAirplane(flight.airplane_id));

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
            order: [['purchase_id', 'ASC']],
            raw: true,
            include: [
                {
                    model: models.passenger,
                    as: 'passenger',
                    attributes :[]
                }
            ]
        })
        const flightJson: FlightPassengers = flight?.toJSON();
        flightJson.passengers = passengers;
        return flightJson 
    }

    async findSeatOfAirplane(airplane_id: number) {
        return models.seat.findAll({
            where: {
                airplane_id
            }
        })
    }

    async assingSeatToPassenger(passenger: PassengerBoardingPass, seats: Seat[]){

    }
}