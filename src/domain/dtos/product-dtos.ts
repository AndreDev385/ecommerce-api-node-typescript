import { Asset } from '../entity/asset';
import { Brand } from '../entity/brand';
import { Variation } from '../entity/variation';
import { InputAssetDto, ReadAssetDTO } from './asset-dtos';
import { InputVariationDto } from './variation-dtos';

export interface InputProductDto {
  id: string;
  name: string;
  brandId: string;
  categoryId: string;
  description?: string | null;
  asset?: Asset | null;
  tags?: string[];
  variations?: Variation[];
}

export interface UpdateProductDTO {
  name?: string;
  brand?: Brand;
  description?: string;
  tags?: string[];
}

export class ReadProductDTO {
  id: string;
  name: string;
  brandId: string;
  categoryId: string;
  description: string | null;
  tags: string[];
  asset: Asset | null;
  variations: Variation[];

  constructor(
    id: string,
    name: string,
    brandId: string,
    categoryId: string,
    description: string,
    tags: string[],
    asset: Asset | null,
    variations: Variation[]
  ) {
    this.id = id;
    this.name = name;
    this.brandId = brandId;
    this.categoryId = categoryId;
    this.description = description;
    this.tags = tags;
    this.asset = asset;
    this.variations = variations;
  }
}
