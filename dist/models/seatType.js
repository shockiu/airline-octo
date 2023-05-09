"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seatType = void 0;
const sequelize_1 = require("sequelize");
class seatType extends sequelize_1.Model {
    static initModel(sequelize) {
        return sequelize.define('seatType', {
            seat_type_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "Identificador de la tabla"
            },
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "Nombre del tipo de asiento"
            }
        }, {
            tableName: 'seat_type',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "seat_type_id" },
                    ]
                },
            ]
        });
    }
}
exports.seatType = seatType;
