"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = void 0;
const sequelize_1 = require("sequelize");
class purchase extends sequelize_1.Model {
    static initModel(sequelize) {
        return sequelize.define('purchase', {
            purchase_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "Identificador de la tabla"
            },
            purchase_date: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "Fecha de la compra"
            }
        }, {
            tableName: 'purchase',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "purchase_id" },
                    ]
                },
            ]
        });
    }
}
exports.purchase = purchase;
