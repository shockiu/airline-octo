import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { boardingPass, boardingPassId } from './boardingPass';
import type { seat, seatId } from './seat';

export interface seatTypeAttributes {
  seat_type_id: number;
  name: string;
}

export type seatTypePk = "seat_type_id";
export type seatTypeId = seatType[seatTypePk];
export type seatTypeOptionalAttributes = "seat_type_id";
export type seatTypeCreationAttributes = Optional<seatTypeAttributes, seatTypeOptionalAttributes>;

export class seatType extends Model<seatTypeAttributes, seatTypeCreationAttributes> implements seatTypeAttributes {
  seat_type_id!: number;
  name!: string;

  // seatType hasMany boardingPass via seat_type_id
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
  // seatType hasMany seat via seat_type_id
  seats!: seat[];
  getSeats!: Sequelize.HasManyGetAssociationsMixin<seat>;
  setSeats!: Sequelize.HasManySetAssociationsMixin<seat, seatId>;
  addSeat!: Sequelize.HasManyAddAssociationMixin<seat, seatId>;
  addSeats!: Sequelize.HasManyAddAssociationsMixin<seat, seatId>;
  createSeat!: Sequelize.HasManyCreateAssociationMixin<seat>;
  removeSeat!: Sequelize.HasManyRemoveAssociationMixin<seat, seatId>;
  removeSeats!: Sequelize.HasManyRemoveAssociationsMixin<seat, seatId>;
  hasSeat!: Sequelize.HasManyHasAssociationMixin<seat, seatId>;
  hasSeats!: Sequelize.HasManyHasAssociationsMixin<seat, seatId>;
  countSeats!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof seatType {
    return sequelize.define('seatType', {
    seat_type_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Identificador de la tabla"
    },
    name: {
      type: DataTypes.STRING(255),
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
  }) as typeof seatType;
  }
}
