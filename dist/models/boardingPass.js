"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardingPass = void 0;
const sequelize_1 = require("sequelize");
class boardingPass extends sequelize_1.Model {
    static initModel(sequelize) {
        return sequelize.define('boardingPass', {
            boarding_pass_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "Identificador de la tabla"
            },
            purchase_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "Id de la compra",
                references: {
                    model: 'purchase',
                    key: 'purchase_id'
                }
            },
            passenger_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "Id del pasajero",
                references: {
                    model: 'passenger',
                    key: 'passenger_id'
                }
            },
            seat_type_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "Id del tipo de asiento",
                references: {
                    model: 'seat_type',
                    key: 'seat_type_id'
                }
            },
            seat_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                comment: "Id del asiento",
                references: {
                    model: 'seat',
                    key: 'seat_id'
                }
            },
            flight_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "Id del vuelo",
                references: {
                    model: 'flight',
                    key: 'flight_id'
                }
            }
        }, {
            tableName: 'boarding_pass',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "boarding_pass_id" },
                    ]
                },
                {
                    name: "purchase_id_bp",
                    using: "BTREE",
                    fields: [
                        { name: "purchase_id" },
                    ]
                },
                {
                    name: "passenger_id_bp",
                    using: "BTREE",
                    fields: [
                        { name: "passenger_id" },
                    ]
                },
                {
                    name: "seat_type_id_bp",
                    using: "BTREE",
                    fields: [
                        { name: "seat_type_id" },
                    ]
                },
                {
                    name: "flight_id_bp",
                    using: "BTREE",
                    fields: [
                        { name: "flight_id" },
                    ]
                },
                {
                    name: "seat_id_bp",
                    using: "BTREE",
                    fields: [
                        { name: "seat_id" },
                    ]
                },
            ]
        });
    }
}
exports.boardingPass = boardingPass;
