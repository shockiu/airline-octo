"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flight = void 0;
const sequelize_1 = require("sequelize");
class flight extends sequelize_1.Model {
    static initModel(sequelize) {
        return sequelize.define('flight', {
            flight_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "Identificador de la tabla"
            },
            takeoff_date_time: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "Fecha y hora del despegue"
            },
            takeoff_airport: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "Aeropuerto de despegue"
            },
            landing_date_time: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "Fecha y hora de aterrizaje"
            },
            landing_airport: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "Aeropuerto de aterrizaje"
            },
            airplane_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "Id del avión",
                references: {
                    model: 'airplane',
                    key: 'airplane_id'
                }
            }
        }, {
            tableName: 'flight',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "flight_id" },
                    ]
                },
                {
                    name: "airplane_id_fl",
                    using: "BTREE",
                    fields: [
                        { name: "airplane_id" },
                    ]
                },
            ]
        });
    }
}
exports.flight = flight;
