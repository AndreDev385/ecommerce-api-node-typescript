import { Asset } from './asset';
import { Product } from './product';
import { typeCheck } from 'type-check';
import { v4 } from 'uuid';

export class Brand {
    private id: string;
    private name: string;
    private description: string | null;
    private asset: Asset | null;
    private products: Array<Product> = [];

    constructor(name: string, description?: string | null, asset?: Asset | null, products?: Array<Product>) {
        this.id = v4();
        this.setName(name);
        if (description) this.setDescription(description);
        if (asset) this.setAsset(asset);
        if (products) {
            for (const product of products) {
                this.addProduct(product);
            }
        }
    }

    getId(): string {
        console.log(this.id);
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        if (!name) {
            throw new Error('Name is required');
        }
        if (!typeCheck('String', name)) {
            throw new Error('Name should be a string');
        }
        if (name.length < 4) {
            throw new Error('Name should have at least 4 characters');
        }
        this.name = name;
    }

    getDescription(): string | null {
        return this.description;
    }

    setDescription(description: string): void {
        if (!typeCheck('String', description)) {
            throw new Error('Description should be a string');
        }
        this.description = description;
    }

    getAsset(): Asset | null {
        return this.asset;
    }

    setAsset(asset: Asset): void {
        this.asset = asset;
    }

    getProducts(): Array<Product> {
        return this.products;
    }

    addProduct(product: Product): void {
        this.products.push(product);
    }
}
