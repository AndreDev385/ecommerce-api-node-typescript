import { typeCheck } from 'type-check';
import { v4 } from 'uuid';

export class Asset {
    private id: string;
    private originalUrl: string;
    private optimizedUrl: string | null;

    constructor(
        originalUrl: string,
        optimizedUrl?: string | null
    ) {
        this.id = v4()
        this.setOriginalUrl(originalUrl);
        if (optimizedUrl) this.setOptimizedUrl(optimizedUrl);
    }

    getId(): string {
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
