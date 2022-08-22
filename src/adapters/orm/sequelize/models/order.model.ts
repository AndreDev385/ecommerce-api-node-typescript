import { DataTypes } from "sequelize";
import sequelize from "../config";
import { UserModel } from "./user.model";
import { VariationModel } from "./variation.model";

export const OrderModel = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      values: ["completed", "waiting", "canceled"],
      defaultValue: "waiting",
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      //allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

UserModel.hasMany(OrderModel, {
  foreignKey: "userId",
  sourceKey: "id",
});

OrderModel.belongsTo(UserModel, {
  foreignKey: "userId",
  targetKey: "id",
});

const Order_Variations = sequelize.define(
  "order_variations",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    quantity: {
      type: DataTypes.INTEGER,
    }
  },
  { timestamps: true }
);

OrderModel.belongsToMany(VariationModel, {
  through: "order_variations",
});

VariationModel.belongsToMany(OrderModel, {
  through: "order_variations",
});
