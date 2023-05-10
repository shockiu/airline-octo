"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightService = void 0;
const db_1 = require("../config/db");
const init_models_1 = require("../models/init-models");
const models = (0, init_models_1.initModels)(db_1.db);
class FlightService {
    constructor() { }
    findFlightsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const flight = yield models.flight.findOne({
                where: { flight_id: id },
                attributes: [
                    ['flight_id', 'flightId'],
                    ['takeoff_date_time', 'takeoffDateTime'],
                    ['takeoff_airport', 'takeoffAirport'],
                    ['landing_date_time', 'landingDateTime'],
                    ['landing_airport', 'landingAirport'],
                    ['airplane_id', 'airplaneId'],
                ]
            });
            if (!flight)
                throw { message: 'notFound', resposneDb: {} };
            const passengers = yield models.boardingPass.findAll({
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
                        attributes: []
                    }
                ]
            });
            const flightJson = flight === null || flight === void 0 ? void 0 : flight.toJSON();
            flightJson.passengers = passengers;
            return flightJson;
        });
    }
}
exports.FlightService = FlightService;
