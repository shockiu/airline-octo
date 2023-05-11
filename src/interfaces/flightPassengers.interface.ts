import { flightAttributes } from '../models/flight';
import { boardingPass } from '../models/boardingPass'
import { PassengerBoardingPass } from './passengers.interface'

export interface FlightPassengers extends flightAttributes {
    passengers: PassengerBoardingPass[] | boardingPass[];
}