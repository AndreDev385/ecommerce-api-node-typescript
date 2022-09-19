import { typeCheck } from 'type-check';
import { Asset } from './asset';
import { Variation } from './variation';

export class Product {
    private id: string | null;
    private name: string;
    private brandId: string;
    private categoryId: string;
    private description: string | null;
    private tags: Array<string> = [];
    private asset: Asset | null;
    private variations: Array<Variation> = [];

    constructor(
        name: string,
        brandId: string,
        categoryId: string,
        id?: string | null,
        description?: string | null,
        tags?: Array<string>,
        variations?: Array<Variation>
    ) {
        if (id) this.setId(id);
        this.setName(name);
        this.setBrand(brandId);
        this.setCategory(categoryId);
        if (description) this.setDescription(description);
        if (tags) {
            for (const tag of tags) {
                this.addTags(tag);
            }
        }
        if (variations) {
            for (const variation of variations) {
                this.addVariation(variation);
            }
        }
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
    }

    getName(): string {
        return this.name;
    }

    setBrand(brand: string) {
        this.brandId = brand;
    }

    getBrand(): string {
        return this.brandId;
    }

    setCategory(category: string): void {
        this.categoryId = category;
    }

    getCategory(): string {
        return this.categoryId;
    }

    setDescription(str: string) {
        if (!typeCheck('String', str)) {
            throw new Error('Description should be a string');
        }

        this.description = this.description;
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

    setAsset(asset: Asset): void {
        this.asset = asset;
    }

    getAsset(): Asset | null {
        return this.asset;
    }

    addVariation(variation: Variation): void {
        this.variations.push(variation);
    }

    getVariations(): Array<Variation> {
        return this.variations;
    }
}
