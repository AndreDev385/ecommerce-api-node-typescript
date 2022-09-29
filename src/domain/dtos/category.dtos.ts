import { Asset } from '../entity/asset';
import { Product } from '../entity/product';

export interface CreateCategoryDTO {
  id: string
  name: string
  description: string
  tags: string[]
  products: Product[]
  asset: Asset
}
