import { Asset } from '../entity/asset';
import { Product } from '../entity/product';

export interface CreateCategoryDTO {
    name: string;
    slug: string;
    title?: string;
    description?: string;
    tags?: Array<string>;
}

export interface UpdateCategoryDTO {
    name?: string;
    slug?: string;
    title?: string;
    description?: string;
    tags?: Array<string>;
}

export class ReadCategoryDTO {
    id: number;
    name: string;
    slug: string;
    description: string;
    tags: Array<string>;
    products: Array<Product>;
    asset: Asset | null;

    constructor(
        id: number,
        name: string,
        slug: string,
        description: string,
        tags: string[],
        products: Product[],
        asset: Asset | null
    ) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.tags = tags;
        this.products = products;
        this.asset = asset;
    }
}
