import { Sequelize } from "sequelize-typescript";
import { config } from "../../../presentation/config";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "db",
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  logging: false,
});

export default sequelize;
