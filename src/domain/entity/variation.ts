import { CreateVariation, UpdateVariation } from '../dtos/variation-dtos';
import { createVariationSchema } from '../schemas/variation.schema';
import { Asset } from './asset';

export class Attribute {
    name: string;
    value: string;

    constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }
}

export class Variation {
    id: number;
    productId: number;
    assets: Asset[];
    attributes: Array<Attribute>;
    normalPrice: number;
    offerPrice: number;
    stock: number;
    isAvaible: boolean;
    isActive: boolean;
    Order_Variations?: { quantity: number };

    static validateCreateVariation(data: CreateVariation) {
        const { error } = createVariationSchema.validate(data, {
            abortEarly: false,
        });
        if (error) throw error;
    }

    static validateUpdateVariation(data: UpdateVariation) {
        const { error } = createVariationSchema.validate(data, {
            abortEarly: false,
        });
        if (error) throw error;
    }
}
