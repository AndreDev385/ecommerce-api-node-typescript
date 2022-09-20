import { typeCheck } from 'type-check';
import { v4 } from 'uuid';
import { Asset } from './asset';
import { Variation } from './variation';

export class Product {
    private id: string;
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
        description?: string,
        tags?: Array<string>,
        asset?: Asset,
        variations?: Array<Variation>
    ) {
        this.id = v4();
        this.setName(name);
        this.setBrandId(brandId);
        this.setCategoryId(categoryId);
        if (description) this.setDescription(description);
        if (tags) {
            for (const tag of tags) {
                this.addTags(tag);
            }
        }
        if (asset) this.setAsset(asset);
        if (variations) {
            for (const variation of variations) {
                this.addVariation(variation);
            }
        }
    }

    getId(): string {
        return this.id;
    }

    setName(name: string): void {
        if (!typeCheck('String', name)) {
            throw new Error('Name should be a string');
        }
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    setBrandId(brand: string) {
        this.brandId = brand;
    }

    getBrandId(): string {
        return this.brandId;
    }

    setCategoryId(category: string): void {
        this.categoryId = category;
    }

    getCategoryId(): string {
        return this.categoryId;
    }

    setDescription(str: string) {
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
