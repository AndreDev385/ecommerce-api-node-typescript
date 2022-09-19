import { Asset } from './asset';
import { Product } from './product';
import { typeCheck } from 'type-check';

export class Brand {
    private id: string | null = null;
    private name: string;
    private description: string | null = null;
    private asset: Asset | null = null;
    private products: Array<Product> = [];

    constructor(
        name: string | null,
        id?: string | null,
        description?: string | null,
        asset?: Asset | null,
        products?: Array<Product>
    ) {
        this.setId(id);
        this.setName(name);
        if (description) this.setDescription(description);
        if (asset) this.setAsset(asset);
        if (products) {
            for (const product of products) {
                this.addProduct(product);
            }
        }
    }

    setId(id: any): void {
        if (!this.id) {
            this.id = id;
        }
    }

    getId(): string | null {
        console.log(this.id);
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string | null): void {
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
