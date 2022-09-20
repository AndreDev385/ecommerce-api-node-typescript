import { typeCheck } from 'type-check';
import { v4 } from 'uuid';
import { Asset } from './asset';

export interface Attribute {
    name: string;
    value: string;
}

export class Variation {
    id: string;
    productId: string;
    price: number;
    offerPrice: number | null;
    attributes: Array<Attribute>;
    stock: number;
    isAvaible: boolean;
    assets: Asset[] = [];

    constructor(
        productId: string,
        price: number,
        attributes: Array<Attribute>,
        stock: number,
        asset: Array<Asset>,
        oPrice?: number
    ) {
        this.id = v4();
        this.setProductId(productId);
        this.setPrice(price);
        this.setOfferPrice(oPrice);
        this.setAttributes(attributes);
        this.setStock(stock);
        if (asset) {
            for (const a of asset) {
                this.addAsset(a);
            }
        }
    }

    private setProductId(str: string) {
        if (!typeCheck('String', str)) {
            throw new Error('productId should be a string');
        }
        this.productId = str;
    }

    getProductId(): string {
        return this.productId;
    }

    setPrice(n: number): void {
        if (!typeCheck('Number', n)) {
            throw new Error('Price should be a number');
        }
        if (n <= 0) {
            throw new Error('Price should be greater than zero');
        }
        this.price = n;
    }

    getPrice(): number {
        return this.price;
    }

    setOfferPrice(n?: number): void {
        console.log(n)
        if (!n) {
            console.log("No number")
            this.offerPrice = null;
            return;
        }
        if (!typeCheck('Number', n)) {
            throw new Error('Price should be a number');
        }
        if (n < 0) {
            throw new Error('Price should be greater than zero');
        }
        this.offerPrice = n;
    }

    getOfferPrice(): number | null {
        return this.offerPrice;
    }

    setAttributes(arr: Array<Attribute>): void {
        if (arr.length < 1) {
            throw new Error('Insert some attributes');
        }
        this.attributes = arr;
    }

    getAttributes(): Array<Attribute> {
        return this.attributes;
    }

    private setIsAvaible(bool: boolean) {
        this.isAvaible = bool;
    }

    getIsAvaible(): boolean {
        return this.isAvaible;
    }

    setStock(n: number): void {
        if (!typeCheck('Number', n)) {
            throw new Error('Stock should be a number');
        }
        if (n < 0) {
            throw new Error('Stock should be positive');
        }
        this.stock = n
        this.setIsAvaible(true)
        if (n === 0) {
            this.setIsAvaible(false);
        }
    }

    getStock(): number {
        return this.stock;
    }

    addAsset(asset: Asset) {
        this.assets.push(asset);
    }

    getAssets(): Array<Asset> {
        return this.assets;
    }
}
