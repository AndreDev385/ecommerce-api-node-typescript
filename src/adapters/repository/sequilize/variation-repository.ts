import {
  CreateVariation,
  ReadVariationDTO,
  UpdateVariation,
  Variation,
} from "../../../domain/entity/variation";
import { VariationRepository } from "../../../domain/repository/interface/variation-repository";
import { AssetModel } from "../../orm/sequelize/models/asset.model";
import { AttributesModel } from "../../orm/sequelize/models/variation.model";
import { SequelizeWrapper } from "./db-sequelize-wrapper";

export class SequelizeVariationRepository implements VariationRepository {
  constructor(private database: SequelizeWrapper) {}
  async create(variation: CreateVariation): Promise<Variation> {
    console.log(variation);
    return await this.database.create(variation, { include: AttributesModel });
  }
  async findAll(): Promise<Variation[]> {
    return await this.database.findAll({
      include: [AssetModel, AttributesModel],
      where: { isActive: true },
    });
  }
  async findOne(id: number): Promise<Variation> {
    return await this.database.findOne({
      include: [AssetModel, AttributesModel],
      where: { id, isActive: true },
    });
  }
  async update(id: number, data: UpdateVariation): Promise<Variation> {
    return await this.database.update({ data }, { where: { id } });
  }
  async delete(id: number): Promise<void> {
    return await this.database.update({ isActive: false }, { where: { id } });
  }
}
