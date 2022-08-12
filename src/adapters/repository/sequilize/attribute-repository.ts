import { Attribute } from "../../../domain/entity/variation";
import { AttributeRepository } from "../../../domain/repository/interface/attribute-respository";
import { SequelizeWrapper } from "./db-sequelize-wrapper";

export class SequelizeAttributeRepository implements AttributeRepository {
  constructor(private database: SequelizeWrapper) {}
  async findAll(): Promise<Attribute[]> {
    const result = await this.database.findAll({});
    return result;
  }

  async create(attribute: Attribute): Promise<Attribute> {
    const result = await this.database.create(attribute);
    return result;
  }
}
