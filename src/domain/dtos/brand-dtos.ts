import { Asset } from '../entity/asset';
import { Product } from '../entity/product';

export interface InputBrandDto {
    id?: string;
    name: string;
    description: string;
    asset: Asset;
}

export class OutputBrandDto {
    id: string;
    name: string;
    description: string | null;
    products: Array<Product>;
    asset: Asset | null;

    constructor(
        id: string,
        name: string,
        description: string | null,
        products: Array<Product>,
        asset: Asset | null
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.products = products;
        this.asset = asset;
    }
}
