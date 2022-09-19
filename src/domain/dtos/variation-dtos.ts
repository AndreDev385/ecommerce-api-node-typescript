import { Attribute } from '../entity/variation';
import { ReadAssetDTO } from './asset-dtos';

export interface CreateVariation {
    productId: number;
    images?: number[];
    attributes?: Attribute[];
    normalPrice: number;
    offerPrice?: number;
    stock?: number;
    isAvaible?: boolean;
    isActive?: boolean;
}

export interface UpdateVariation {
    productId?: number;
    images?: number[];
    attributes?: Attribute[];
    normalPrice: number;
    offerPrice?: number;
    stock?: number;
    isAvaible?: boolean;
    isActive?: boolean;
}

export class ReadVariationDTO {
    id: number;
    productId: number;
    assets: ReadAssetDTO[];
    attributes: Attribute[];
    normalPrice: number;
    offerPrice: number;
    stock: number;
    isAvaible: boolean;
    Order_Variations: object;

    constructor(
        id: number,
        productId: number,
        normalPrice: number,
        offerPrice: number,
        stock: number,
        isAvaible: boolean,
        attributes: Attribute[],
        assets: ReadAssetDTO[]
    ) {
        this.id = id;
        this.productId = productId;
        this.normalPrice = normalPrice;
        this.offerPrice = offerPrice;
        this.stock = stock;
        this.isAvaible = isAvaible;
        this.attributes = attributes;
        this.assets = assets;
        //this.Order_Variations = {}
    }
}
