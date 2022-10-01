import { Asset } from '../entity/asset';
import { Product } from '../entity/product';

export interface InputBrandDto {
  id: string;
  name: string;
  description?: string;
  asset?: Asset;
  products?: Product[];
}

export class OutputBrandDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  products: Product[];
  asset: Asset | null;
}
