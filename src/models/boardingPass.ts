import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { flight, flightId } from './flight';
import type { passenger, passengerId } from './passenger';
import type { purchase, purchaseId } from './purchase';
import type { seat, seatId } from './seat';
import type { seatType, seatTypeId } from './seatType';

export interface boardingPassAttributes {
  boarding_pass_id: number;
  purchase_id: number;
  passenger_id: number;
  seat_type_id: number;
  seat_id?: number;
  flight_id: number;
}

export type boardingPassPk = "boarding_pass_id";
export type boardingPassId = boardingPass[boardingPassPk];
export type boardingPassOptionalAttributes = "boarding_pass_id" | "seat_id";
export type boardingPassCreationAttributes = Optional<boardingPassAttributes, boardingPassOptionalAttributes>;

export class boardingPass extends Model<boardingPassAttributes, boardingPassCreationAttributes> implements boardingPassAttributes {
  boarding_pass_id!: number;
  purchase_id!: number;
  passenger_id!: number;
  seat_type_id!: number;
  seat_id?: number;
  flight_id!: number;

  // boardingPass belongsTo flight via flight_id
  flight!: flight;
  getFlight!: Sequelize.BelongsToGetAssociationMixin<flight>;
  setFlight!: Sequelize.BelongsToSetAssociationMixin<flight, flightId>;
  createFlight!: Sequelize.BelongsToCreateAssociationMixin<flight>;
  // boardingPass belongsTo passenger via passenger_id
  passenger!: passenger;
  getPassenger!: Sequelize.BelongsToGetAssociationMixin<passenger>;
  setPassenger!: Sequelize.BelongsToSetAssociationMixin<passenger, passengerId>;
  createPassenger!: Sequelize.BelongsToCreateAssociationMixin<passenger>;
  // boardingPass belongsTo purchase via purchase_id
  purchase!: purchase;
  getPurchase!: Sequelize.BelongsToGetAssociationMixin<purchase>;
  setPurchase!: Sequelize.BelongsToSetAssociationMixin<purchase, purchaseId>;
  createPurchase!: Sequelize.BelongsToCreateAssociationMixin<purchase>;
  // boardingPass belongsTo seat via seat_id
  seat!: seat;
  getSeat!: Sequelize.BelongsToGetAssociationMixin<seat>;
  setSeat!: Sequelize.BelongsToSetAssociationMixin<seat, seatId>;
  createSeat!: Sequelize.BelongsToCreateAssociationMixin<seat>;
  // boardingPass belongsTo seatType via seat_type_id
  seat_type!: seatType;
  getSeat_type!: Sequelize.BelongsToGetAssociationMixin<seatType>;
  setSeat_type!: Sequelize.BelongsToSetAssociationMixin<seatType, seatTypeId>;
  createSeat_type!: Sequelize.BelongsToCreateAssociationMixin<seatType>;

  static initModel(sequelize: Sequelize.Sequelize): typeof boardingPass {
    return sequelize.define('boardingPass', {
    boarding_pass_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Identificador de la tabla"
    },
    purchase_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Id de la compra",
      references: {
        model: 'purchase',
        key: 'purchase_id'
      }
    },
    passenger_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Id del pasajero",
      references: {
        model: 'passenger',
        key: 'passenger_id'
      }
    },
    seat_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Id del tipo de asiento",
      references: {
        model: 'seat_type',
        key: 'seat_type_id'
      }
    },
    seat_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Id del asiento",
      references: {
        model: 'seat',
        key: 'seat_id'
      }
    },
    flight_id: {
      type: DataTypes.INTEGER,
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
  }) as typeof boardingPass;
  }
}
