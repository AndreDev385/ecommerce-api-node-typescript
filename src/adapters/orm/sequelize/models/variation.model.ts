import sequelize from "../config";
import { DataTypes, Model } from "sequelize";
import { ProductModel } from "./product.model";
import { AssetModel } from "./asset.model";

//export class VariationModel extends Model {}

export const VariationModel = sequelize.define(
  "variation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    /*product: {
      type: DataTypes.INTEGER,
      references: {
        model: ProductModel,
        key: "id",
      },
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      references: {
        model: AssetModel,
        key: "id",
      },
      defaultValue: [],
    },*/
    attributes: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [],
    },
    normalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    offerPrice: {
      type: DataTypes.FLOAT,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    //sequelize,
    timestamps: true,
  }
);

VariationModel.hasMany(AssetModel, {
  foreignKey: "variationId",
  sourceKey:  "id"
})

AssetModel.belongsTo(VariationModel, {
  foreignKey: "variarionId",
  targetKey: "id"
})