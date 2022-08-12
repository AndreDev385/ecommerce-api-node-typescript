import sequelize from "../config";
import { DataTypes, Model } from "sequelize";
import { ProductModel } from "./product.model";
import { AssetModel } from "./asset.model";
import { SequilizeUserRepository } from "../../../repository/sequilize/user-repository";

//export class VariationModel extends Model {}
export const AttributesModel = sequelize.define("attribute", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

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
    },
    attributes: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [],
    },*/
    normalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    offerPrice: {
      type: DataTypes.FLOAT,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isAvaible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    //sequelize,
    timestamps: true,
  }
);

VariationModel.hasMany(AssetModel, {
  foreignKey: "variationId",
  sourceKey: "id",
});

AssetModel.belongsTo(VariationModel, {
  foreignKey: "variationId",
  targetKey: "id",
});

export const Variation_Attributes = sequelize.define(
  "Variation_Attributes",
  {
    selfGranted: DataTypes.BOOLEAN,
  },
  { timestamps: true }
);

VariationModel.belongsToMany(AttributesModel, {
  through: Variation_Attributes,
});
AttributesModel.belongsToMany(VariationModel, {
  through: Variation_Attributes,
});
