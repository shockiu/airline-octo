import { passengerAttributes } from '../models/passenger';
import { boardingPassAttributes } from '../models/boardingPass';

export interface PassengerBoardingPass extends passengerAttributes, boardingPassAttributes {
}