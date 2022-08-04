import sequelize from "../config";
import { DataTypes, Model, ModelStatic } from "sequelize";
import { AssetModel } from "./asset.model";
import { ProductModel } from "./product.model";

//export class CategoryModel extends Model {}

export const CategoryModel = sequelize.define(
  "category",
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
    /*image: {
      type: DataTypes.INTEGER,
      references: {
        model: AssetModel,
        key: "id",
      },
      defaultValue: null,
    },*/
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    //sequelize,
    timestamps: true,
  }
);

CategoryModel.hasMany(ProductModel, {
  foreignKey: "categoryId",
  sourceKey: "id",
});

ProductModel.belongsTo(CategoryModel, {
  foreignKey: "categoryId",
  targetKey: "id",
});

CategoryModel.hasOne(AssetModel, {
  foreignKey: "categoryId",
  sourceKey: "id",
});

AssetModel.belongsTo(CategoryModel, {
  foreignKey: "categoryId",
  targetKey: "id",
});
