import { Sequelize } from "sequelize";
import { config } from "../../../presentation/config";

const sequelize = new Sequelize(
  config.DB_NAME as string,
  config.DB_USER as string,
  config.DB_PASSWORD,
  {
    host: "db",
    dialect: "postgres",
  }
);

/*const sequelize = new Sequelize({
  dialect: "postgres",
  host: "db",
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  logging: false,
  //models: [__dirname + "/models/*model.ts"]
});
console.log(__dirname)*/

export default sequelize