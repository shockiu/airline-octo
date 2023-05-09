import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { flight, flightId } from './flight';
import type { seat, seatId } from './seat';

export interface airplaneAttributes {
  airplane_id: number;
  name: string;
}

export type airplanePk = "airplane_id";
export type airplaneId = airplane[airplanePk];
export type airplaneOptionalAttributes = "airplane_id";
export type airplaneCreationAttributes = Optional<airplaneAttributes, airplaneOptionalAttributes>;

export class airplane extends Model<airplaneAttributes, airplaneCreationAttributes> implements airplaneAttributes {
  airplane_id!: number;
  name!: string;

  // airplane hasMany flight via airplane_id
  flights!: flight[];
  getFlights!: Sequelize.HasManyGetAssociationsMixin<flight>;
  setFlights!: Sequelize.HasManySetAssociationsMixin<flight, flightId>;
  addFlight!: Sequelize.HasManyAddAssociationMixin<flight, flightId>;
  addFlights!: Sequelize.HasManyAddAssociationsMixin<flight, flightId>;
  createFlight!: Sequelize.HasManyCreateAssociationMixin<flight>;
  removeFlight!: Sequelize.HasManyRemoveAssociationMixin<flight, flightId>;
  removeFlights!: Sequelize.HasManyRemoveAssociationsMixin<flight, flightId>;
  hasFlight!: Sequelize.HasManyHasAssociationMixin<flight, flightId>;
  hasFlights!: Sequelize.HasManyHasAssociationsMixin<flight, flightId>;
  countFlights!: Sequelize.HasManyCountAssociationsMixin;
  // airplane hasMany seat via airplane_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof airplane {
    return sequelize.define('airplane', {
    airplane_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Identificador de la tabla"
    },
    name: {
      type: DataTypes.STRING(255),
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
  }) as typeof airplane;
  }
}
