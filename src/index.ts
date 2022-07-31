import { app } from "./app";
import sequelize from "./adapters/orm/sequelize/config";
import { config } from "./config";
import "./adapters/orm/sequelize/models/user.models"

async function main() {
  try {
    await sequelize.sync();
    console.log("Database connected")
    app.listen(config.PORT)
    console.log(`Server running on port ${config.PORT}`)
  } catch (err) {
    console.log(err);
  }
}

main();
