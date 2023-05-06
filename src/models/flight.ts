import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { airplane, airplaneId } from './airplane';
import type { boardingPass, boardingPassId } from './boardingPass';

export interface flightAttributes {
  flight_id: number;
  takeoff_date_time: number;
  takeoff_airport: string;
  landing_date_time: number;
  landing_airport: string;
  airplane_id: number;
}

export type flightPk = "flight_id";
export type flightId = flight[flightPk];
export type flightOptionalAttributes = "flight_id";
export type flightCreationAttributes = Optional<flightAttributes, flightOptionalAttributes>;

export class flight extends Model<flightAttributes, flightCreationAttributes> implements flightAttributes {
  flight_id!: number;
  takeoff_date_time!: number;
  takeoff_airport!: string;
  landing_date_time!: number;
  landing_airport!: string;
  airplane_id!: number;

  // flight belongsTo airplane via airplane_id
  airplane!: airplane;
  getAirplane!: Sequelize.BelongsToGetAssociationMixin<airplane>;
  setAirplane!: Sequelize.BelongsToSetAssociationMixin<airplane, airplaneId>;
  createAirplane!: Sequelize.BelongsToCreateAssociationMixin<airplane>;
  // flight hasMany boardingPass via flight_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof flight {
    return sequelize.define('flight', {
    flight_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Identificador de la tabla"
    },
    takeoff_date_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Fecha y hora del despegue"
    },
    takeoff_airport: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Aeropuerto de despegue"
    },
    landing_date_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Fecha y hora de aterrizaje"
    },
    landing_airport: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Aeropuerto de aterrizaje"
    },
    airplane_id: {
      type: DataTypes.INTEGER,
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
  }) as typeof flight;
  }
}
