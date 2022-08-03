import sequelize from "../config";
import { DataTypes } from "sequelize";
import { AssetModel } from "./asset.model";
import { ProductModel } from "./product.model";

//export class BrandModel extends Model {}

export const BrandModel = sequelize.define(
  "brand",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    image: {
      type: DataTypes.INTEGER,
      references: {
        model: AssetModel,
        key: "id",
      },
      defaultValue: null,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    //sequelize,
    timestamps: true,
    modelName: "brand",
  }
);

BrandModel.hasMany(ProductModel, {
  foreignKey: "brandId",
  sourceKey: "id",
});

ProductModel.belongsTo(BrandModel, {
  foreignKey: "brandId",
  targetKey: "id",
});
