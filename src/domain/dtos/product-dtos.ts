import { Brand } from '../entity/brand';
import { ReadVariationDTO } from '../entity/variation';
import { ReadAssetDTO } from './asset-dtos';

export interface CreateProductDTO {
    name: string;
    brandId: number;
    categoryId: number;
    description?: string;
    tags?: string[];
}

export interface UpdateProductDTO {
    name?: string;
    brand?: Brand;
    description?: string;
    tags?: string[];
}

export class ReadProductDTO {
    id: number;
    name: string;
    brandId: number;
    categoryId: number;
    description: string;
    tags: string[];
    asset: ReadAssetDTO | null;
    variations: ReadVariationDTO[];

    constructor(
        id: number,
        name: string,
        brandId: number,
        categoryId: number,
        description: string,
        tags: string[],
        asset: ReadAssetDTO | null,
        variations: ReadVariationDTO[]
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
