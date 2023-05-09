"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.seatType = exports.seat = exports.purchase = exports.passenger = exports.flight = exports.boardingPass = exports.airplane = void 0;
const airplane_1 = require("./airplane");
Object.defineProperty(exports, "airplane", { enumerable: true, get: function () { return airplane_1.airplane; } });
const boardingPass_1 = require("./boardingPass");
Object.defineProperty(exports, "boardingPass", { enumerable: true, get: function () { return boardingPass_1.boardingPass; } });
const flight_1 = require("./flight");
Object.defineProperty(exports, "flight", { enumerable: true, get: function () { return flight_1.flight; } });
const passenger_1 = require("./passenger");
Object.defineProperty(exports, "passenger", { enumerable: true, get: function () { return passenger_1.passenger; } });
const purchase_1 = require("./purchase");
Object.defineProperty(exports, "purchase", { enumerable: true, get: function () { return purchase_1.purchase; } });
const seat_1 = require("./seat");
Object.defineProperty(exports, "seat", { enumerable: true, get: function () { return seat_1.seat; } });
const seatType_1 = require("./seatType");
Object.defineProperty(exports, "seatType", { enumerable: true, get: function () { return seatType_1.seatType; } });
function initModels(sequelize) {
    const airplane = airplane_1.airplane.initModel(sequelize);
    const boardingPass = boardingPass_1.boardingPass.initModel(sequelize);
    const flight = flight_1.flight.initModel(sequelize);
    const passenger = passenger_1.passenger.initModel(sequelize);
    const purchase = purchase_1.purchase.initModel(sequelize);
    const seat = seat_1.seat.initModel(sequelize);
    const seatType = seatType_1.seatType.initModel(sequelize);
    flight.belongsTo(airplane, { as: "airplane", foreignKey: "airplane_id" });
    airplane.hasMany(flight, { as: "flights", foreignKey: "airplane_id" });
    seat.belongsTo(airplane, { as: "airplane", foreignKey: "airplane_id" });
    airplane.hasMany(seat, { as: "seats", foreignKey: "airplane_id" });
    boardingPass.belongsTo(flight, { as: "flight", foreignKey: "flight_id" });
    flight.hasMany(boardingPass, { as: "boarding_passes", foreignKey: "flight_id" });
    boardingPass.belongsTo(passenger, { as: "passenger", foreignKey: "passenger_id" });
    passenger.hasMany(boardingPass, { as: "boarding_passes", foreignKey: "passenger_id" });
    boardingPass.belongsTo(purchase, { as: "purchase", foreignKey: "purchase_id" });
    purchase.hasMany(boardingPass, { as: "boarding_passes", foreignKey: "purchase_id" });
    boardingPass.belongsTo(seat, { as: "seat", foreignKey: "seat_id" });
    seat.hasMany(boardingPass, { as: "boarding_passes", foreignKey: "seat_id" });
    boardingPass.belongsTo(seatType, { as: "seat_type", foreignKey: "seat_type_id" });
    seatType.hasMany(boardingPass, { as: "boarding_passes", foreignKey: "seat_type_id" });
    seat.belongsTo(seatType, { as: "seat_type", foreignKey: "seat_type_id" });
    seatType.hasMany(seat, { as: "seats", foreignKey: "seat_type_id" });
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
exports.initModels = initModels;
