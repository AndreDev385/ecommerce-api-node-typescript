export interface CreateAssetDTO {
    id: string;
    owner: number;
    originalUrl: string;
    optimizedUrl?: string;
}

export interface UpdateAssetDTO {
    id: string;
    variarionId?: number;
    productId?: number;
    brandId?: number;
    categoryId?: number;
}

export class ReadAssetDTO {
    id: string;
    originalUrl: string;
    optimizedUrl: string | null;

    constructor(id: string, originalUrl: string, optimizeUrl: string | null) {
        this.id = id;
        this.originalUrl = originalUrl;
        this.optimizedUrl = optimizeUrl;
    }
}
