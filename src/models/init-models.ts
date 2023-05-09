import type { Sequelize } from "sequelize";
import { airplane as _airplane } from "./airplane";
import type { airplaneAttributes, airplaneCreationAttributes } from "./airplane";
import { boardingPass as _boardingPass } from "./boardingPass";
import type { boardingPassAttributes, boardingPassCreationAttributes } from "./boardingPass";
import { flight as _flight } from "./flight";
import type { flightAttributes, flightCreationAttributes } from "./flight";
import { passenger as _passenger } from "./passenger";
import type { passengerAttributes, passengerCreationAttributes } from "./passenger";
import { purchase as _purchase } from "./purchase";
import type { purchaseAttributes, purchaseCreationAttributes } from "./purchase";
import { seat as _seat } from "./seat";
import type { seatAttributes, seatCreationAttributes } from "./seat";
import { seatType as _seatType } from "./seatType";
import type { seatTypeAttributes, seatTypeCreationAttributes } from "./seatType";

export {
  _airplane as airplane,
  _boardingPass as boardingPass,
  _flight as flight,
  _passenger as passenger,
  _purchase as purchase,
  _seat as seat,
  _seatType as seatType,
};

export type {
  airplaneAttributes,
  airplaneCreationAttributes,
  boardingPassAttributes,
  boardingPassCreationAttributes,
  flightAttributes,
  flightCreationAttributes,
  passengerAttributes,
  passengerCreationAttributes,
  purchaseAttributes,
  purchaseCreationAttributes,
  seatAttributes,
  seatCreationAttributes,
  seatTypeAttributes,
  seatTypeCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const airplane = _airplane.initModel(sequelize);
  const boardingPass = _boardingPass.initModel(sequelize);
  const flight = _flight.initModel(sequelize);
  const passenger = _passenger.initModel(sequelize);
  const purchase = _purchase.initModel(sequelize);
  const seat = _seat.initModel(sequelize);
  const seatType = _seatType.initModel(sequelize);

  flight.belongsTo(airplane, { as: "airplane", foreignKey: "airplane_id"});
  airplane.hasMany(flight, { as: "flights", foreignKey: "airplane_id"});
  seat.belongsTo(airplane, { as: "airplane", foreignKey: "airplane_id"});
  airplane.hasMany(seat, { as: "seats", foreignKey: "airplane_id"});
  boardingPass.belongsTo(flight, { as: "flight", foreignKey: "flight_id"});
  flight.hasMany(boardingPass, { as: "boarding_passes", foreignKey: "flight_id"});
  boardingPass.belongsTo(passenger, { as: "passenger", foreignKey: "passenger_id"});
  passenger.hasMany(boardingPass, { as: "boarding_passes", foreignKey: "passenger_id"});
  boardingPass.belongsTo(purchase, { as: "purchase", foreignKey: "purchase_id"});
  purchase.hasMany(boardingPass, { as: "boarding_passes", foreignKey: "purchase_id"});
  boardingPass.belongsTo(seat, { as: "seat", foreignKey: "seat_id"});
  seat.hasMany(boardingPass, { as: "boarding_passes", foreignKey: "seat_id"});
  boardingPass.belongsTo(seatType, { as: "seat_type", foreignKey: "seat_type_id"});
  seatType.hasMany(boardingPass, { as: "boarding_passes", foreignKey: "seat_type_id"});
  seat.belongsTo(seatType, { as: "seat_type", foreignKey: "seat_type_id"});
  seatType.hasMany(seat, { as: "seats", foreignKey: "seat_type_id"});

  return {
    airplane: airplane,
    boardingPass: boardingPass,
    flight: flight,
    passenger: passenger,
    purchase: purchase,
    seat: seat,
    seatType: seatType,
  };
}
