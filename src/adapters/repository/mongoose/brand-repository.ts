import { Brand } from '../../../domain/entity/brand'
import { BrandRepository } from '../../../domain/repository/interface/brand-repository'
import { ModelWrapper } from '../../orm/model-wrapper'

export class MongooseBrandRepository implements BrandRepository {
  private static instance: BrandRepository
    constructor(private readonly model: ModelWrapper) {}

  public static getInstance (model: ModelWrapper) {
    if (!MongooseBrandRepository.instance) {
      MongooseBrandRepository.instance = new MongooseBrandRepository(model)
        }
    return MongooseBrandRepository.instance
    }

  create (category: Brand): Promise<Brand> {
    throw new Error('Method not implemented.')
    }
  findAll (): Promise<Brand[]> {
    throw new Error('Method not implemented.')
    }
  findById (id: string): Promise<Brand> {
    throw new Error('Method not implemented.')
    }
  findByName (name: string): Promise<Brand> {
    throw new Error('Method not implemented.')
    }
  update (category: Brand): Promise<Brand> {
    throw new Error('Method not implemented.')
    }
  delete async (id: string): Promise<void> {
    throw new Error('Method not implemented.')
    }
}
