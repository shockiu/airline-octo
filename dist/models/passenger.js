"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passenger = void 0;
const sequelize_1 = require("sequelize");
class passenger extends sequelize_1.Model {
    static initModel(sequelize) {
        return sequelize.define('passenger', {
            passenger_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "Identificador de la tabla"
            },
            dni: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "Número de identificación del pasajero"
            },
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "Nombre completo del pasajero"
            },
            age: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "Edad del pasajero"
            },
            country: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "País del pasajero"
            }
        }, {
            tableName: 'passenger',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "passenger_id" },
                    ]
                },
            ]
        });
    }
}
exports.passenger = passenger;
