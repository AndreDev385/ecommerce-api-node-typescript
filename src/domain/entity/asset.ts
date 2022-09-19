import { typeCheck } from 'type-check';

export class Asset {
    private id: string | null;
    private originalUrl: string;
    private optimizedUrl: string | null;

    constructor(
        originalUrl: string,
        id?: string | null,
        optimizedUrl?: string | null
    ) {
        if (id) this.setId(id);
        this.setOriginalUrl(originalUrl);
        if (optimizedUrl) this.setOptimizedUrl(optimizedUrl);
    }

    setId(id: string): void {
        if (!this.id) {
            this.id = id;
        }
    }

    getId(): string | null {
        return this.id;
    }

    setOriginalUrl(url: string): void {
        if (!typeCheck('String', url)) {
            throw new Error('Url should be a string');
        }
        this.originalUrl = url;
    }

    getOriginalUrl(): string {
        return this.originalUrl;
    }

    setOptimizedUrl(url: string): void {
        if (!typeCheck('String', url)) {
            throw new Error('Url should be a string');
        }
        this.optimizedUrl = url
    }

    getOptimizedUrl(): string | null {
        return this.optimizedUrl;
    }
}
