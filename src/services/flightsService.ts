import { db } from '../config/db';
import { boardingPass, initModels } from '../models/init-models';
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

        const passengers: any[] = await models.boardingPass.findAll({
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
        const seats = await this.findSeatOfAirplane(flightJson.airplane_id);
        flightJson.passengers =  await this.assingSeatToPassenger( passengers, seats);
        return flightJson 
    }

    async findSeatOfAirplane(airplane_id: number) {
        return models.seat.findAll({
            where: {
                airplane_id
            }
        })
    }

    async assingSeatToPassenger(passengers: PassengerBoardingPass[] , seats: Seat[]){
        return await passengers.map((passenger) => {
            let samePurchaseId = passengers.filter((pass) => pass.purchase_id === passenger.purchase_id);
            passengers = passengers.filter((pass) => pass.purchase_id !== passenger.purchase_id);
            samePurchaseId = samePurchaseId.map((element) => {
                if ( element.seat_id ) return element;
                if ( [1,2].includes(element.seat_type_id) ) {
                    let possibleSeat = seats.find((seat) => seat.seat_type_id === element.seat_type_id);
                    if ( !possibleSeat)  {
                        let anotherSeat = seats.find((seat) => seat.seat_type_id !== element.seat_type_id);
                        element.seat_id = anotherSeat?.seat_id;
                        seats = seats.filter((seat) => seat.seat_id !== element.seat_id );
                        return element;
                    }
                    element.seat_id = possibleSeat.seat_id;
                    seats = seats.filter((seat) => seat.seat_id !== element.seat_id );
                    return element;
                }
                let possibleSeat = seats.find((seat) => seat.seat_type_id === 3);
                element.seat_id = possibleSeat?.seat_id;
                seats = seats.filter((seat) => seat.seat_id !== element.seat_id );
                return element;
            })
            return samePurchaseId;
        }).flat();
    }
}