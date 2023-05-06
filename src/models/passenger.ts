import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { boardingPass, boardingPassId } from './boardingPass';

export interface passengerAttributes {
  passenger_id: number;
  dni: string;
  name: string;
  age: number;
  country: string;
}

export type passengerPk = "passenger_id";
export type passengerId = passenger[passengerPk];
export type passengerOptionalAttributes = "passenger_id";
export type passengerCreationAttributes = Optional<passengerAttributes, passengerOptionalAttributes>;

export class passenger extends Model<passengerAttributes, passengerCreationAttributes> implements passengerAttributes {
  passenger_id!: number;
  dni!: string;
  name!: string;
  age!: number;
  country!: string;

  // passenger hasMany boardingPass via passenger_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof passenger {
    return sequelize.define('passenger', {
    passenger_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Identificador de la tabla"
    },
    dni: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Número de identificación del pasajero"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Nombre completo del pasajero"
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Edad del pasajero"
    },
    country: {
      type: DataTypes.STRING(255),
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
  }) as typeof passenger;
  }
}
