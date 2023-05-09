"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seat = void 0;
const sequelize_1 = require("sequelize");
class seat extends sequelize_1.Model {
    static initModel(sequelize) {
        return sequelize.define('seat', {
            seat_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "Identificador de la tabla"
            },
            seat_column: {
                type: sequelize_1.DataTypes.STRING(2),
                allowNull: false,
                comment: "Columna del asiento"
            },
            seat_row: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "Fila del asiento"
            },
            seat_type_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "Id del tipo de asiento {FK}",
                references: {
                    model: 'seat_type',
                    key: 'seat_type_id'
                }
            },
            airplane_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "Id del avión al que pertenece el asiento",
                references: {
                    model: 'airplane',
                    key: 'airplane_id'
                }
            }
        }, {
            tableName: 'seat',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "seat_id" },
                    ]
                },
                {
                    name: "airplane_id_se",
                    using: "BTREE",
                    fields: [
                        { name: "airplane_id" },
                    ]
                },
                {
                    name: "seat_type_id_se",
                    using: "BTREE",
                    fields: [
                        { name: "seat_type_id" },
                    ]
                },
            ]
        });
    }
}
exports.seat = seat;
