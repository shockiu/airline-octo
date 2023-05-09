"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.airplane = void 0;
const sequelize_1 = require("sequelize");
class airplane extends sequelize_1.Model {
    static initModel(sequelize) {
        return sequelize.define('airplane', {
            airplane_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "Identificador de la tabla"
            },
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "Nombre del avión"
            }
        }, {
            tableName: 'airplane',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "airplane_id" },
                    ]
                },
            ]
        });
    }
}
exports.airplane = airplane;
