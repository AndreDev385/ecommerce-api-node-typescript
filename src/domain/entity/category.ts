import { typeCheck } from 'type-check';
import { slugify } from '../utils/slugify';

import { Asset } from './asset';
import { Product } from './product';

export class Category {
    private id: string | null;
    private name: string;
    private slug: string;
    private description: string | null;
    private tags: Array<string> = [];
    private products: Array<Product> = [];
    private asset: Asset | null;

    constructor(
        name: string,
        id?: string | null,
        description?: string | null,
        tags?: Array<string>,
        products?: Array<Product>,
        asset?: Asset | null
    ) {
        if (id) this.setId(id);
        this.setName(name);
        if (description) this.setDescription(description);
        this.setSlug(this.name);
        if (tags) {
            for (const tag of tags) {
                this.addTags(tag);
            }
        }
        if (products) {
            for (const product of products) {
                this.addProducts(product);
            }
        }
        if (asset) this.setAsset(asset);
    }

    setId(id: string): void {
        if (!this.id) {
            this.id = id;
        }
    }

    getId(): string | null {
        return this.id;
    }

    setName(name: string): void {
        if (!typeCheck('String', name)) {
            throw new Error('Name should be a string');
        }
        if (name.length < 3) {
            throw new Error('Name should have at least 3 characters');
        }
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    setSlug(slug: string): void {
        if (!typeCheck('String', slug)) {
            throw new Error('Slug should be a string');
        }
        this.slug = slugify.convert(slug);
    }

    getSlug(): string {
        return this.slug;
    }

    setDescription(str: string): void {
        if (!typeCheck('String', str)) {
            throw new Error('Description should be a string');
        }
        this.description = str;
    }

    getDescription(): string | null {
        return this.description;
    }

    addTags(tag: string): void {
        if (!typeCheck('String', tag)) {
            throw new Error('Tag should be a string');
        }
        this.tags.push(tag);
    }

    getTags(): Array<string> {
        return this.tags;
    }

    addProducts(product: Product): void {
        this.products.push(product);
    }

    getProducts(): Array<Product> {
        return this.products;
    }

    setAsset(asset: Asset): void {
        this.asset = asset;
    }

    getAsset(): Asset | null {
        return this.asset;
    }
}
