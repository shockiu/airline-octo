import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { airplane, airplaneId } from './airplane';
import type { boardingPass, boardingPassId } from './boardingPass';
import type { seatType, seatTypeId } from './seatType';

export interface seatAttributes {
  seat_id: number;
  seat_column: string;
  seat_row: number;
  seat_type_id: number;
  airplane_id: number;
}

export type seatPk = "seat_id";
export type seatId = seat[seatPk];
export type seatOptionalAttributes = "seat_id";
export type seatCreationAttributes = Optional<seatAttributes, seatOptionalAttributes>;

export class seat extends Model<seatAttributes, seatCreationAttributes> implements seatAttributes {
  seat_id!: number;
  seat_column!: string;
  seat_row!: number;
  seat_type_id!: number;
  airplane_id!: number;

  // seat belongsTo airplane via airplane_id
  airplane!: airplane;
  getAirplane!: Sequelize.BelongsToGetAssociationMixin<airplane>;
  setAirplane!: Sequelize.BelongsToSetAssociationMixin<airplane, airplaneId>;
  createAirplane!: Sequelize.BelongsToCreateAssociationMixin<airplane>;
  // seat hasMany boardingPass via seat_id
  boarding_passes!: boardingPass[];
  getBoarding_passes!: Sequelize.HasManyGetAssociationsMixin<boardingPass>;
  setBoarding_passes!: Sequelize.HasManySetAssociationsMixin<boardingPass, boardingPassId>;
  addBoarding_pass!: Sequelize.HasManyAddAssociationMixin<boardingPass, boardingPassId>;
  addBoarding_passes!: Sequelize.HasManyAddAssociationsMixin<boardingPass, boardingPassId>;
  createBoarding_pass!: Sequelize.HasManyCreateAssociationMixin<boardingPass>;
  removeBoarding_pass!: Sequelize.HasManyRemoveAssociationMixin<boardingPass, boardingPassId>;
  removeBoarding_passes!: Sequelize.HasManyRemoveAssociationsMixin<boardingPass, boardingPassId>;
  hasBoarding_pass!: Sequelize.HasManyHasAssociationMixin<boardingPass, boardingPassId>;
  hasBoarding_passes!: Sequelize.HasManyHasAssociationsMixin<boardingPass, boardingPassId>;
  countBoarding_passes!: Sequelize.HasManyCountAssociationsMixin;
  // seat belongsTo seatType via seat_type_id
  seat_type!: seatType;
  getSeat_type!: Sequelize.BelongsToGetAssociationMixin<seatType>;
  setSeat_type!: Sequelize.BelongsToSetAssociationMixin<seatType, seatTypeId>;
  createSeat_type!: Sequelize.BelongsToCreateAssociationMixin<seatType>;

  static initModel(sequelize: Sequelize.Sequelize): typeof seat {
    return sequelize.define('seat', {
    seat_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Identificador de la tabla"
    },
    seat_column: {
      type: DataTypes.STRING(2),
      allowNull: false,
      comment: "Columna del asiento"
    },
    seat_row: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Fila del asiento"
    },
    seat_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Id del tipo de asiento {FK}",
      references: {
        model: 'seat_type',
        key: 'seat_type_id'
      }
    },
    airplane_id: {
      type: DataTypes.INTEGER,
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
  }) as typeof seat;
  }
}
