import { server } from "./server";
import sequelize from "../adapters/orm/sequelize/config";
import { config } from "./config";
import "../adapters/orm/sequelize/models/user.model";
import "../adapters/orm/sequelize/models/asset.model";
import "../adapters/orm/sequelize/models/brand.model";
import "../adapters/orm/sequelize/models/category.model";
import "../adapters/orm/sequelize/models/token.model";
import "../adapters/orm/sequelize/models/product.model";
import "../adapters/orm/sequelize/models/variation.model";

async function main() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database connected");
    server.listen(config.PORT);
    console.log(`Server running on port ${config.PORT}`);
  } catch (err) {
    console.log(err);
  }
}

main();
