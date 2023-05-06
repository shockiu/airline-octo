import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { boardingPass, boardingPassId } from './boardingPass';

export interface purchaseAttributes {
  purchase_id: number;
  purchase_date: number;
}

export type purchasePk = "purchase_id";
export type purchaseId = purchase[purchasePk];
export type purchaseOptionalAttributes = "purchase_id";
export type purchaseCreationAttributes = Optional<purchaseAttributes, purchaseOptionalAttributes>;

export class purchase extends Model<purchaseAttributes, purchaseCreationAttributes> implements purchaseAttributes {
  purchase_id!: number;
  purchase_date!: number;

  // purchase hasMany boardingPass via purchase_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof purchase {
    return sequelize.define('purchase', {
    purchase_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Identificador de la tabla"
    },
    purchase_date: {
      type: DataTypes.INTEGER,
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
  }) as typeof purchase;
  }
}
