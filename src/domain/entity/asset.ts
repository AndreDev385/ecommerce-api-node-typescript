import { typeCheck } from 'type-check';
import { v4 } from 'uuid';
import { InputAssetDto } from '../dtos/asset-dtos';

export class Asset {
  private readonly id: string;
  private originalUrl: string;
  private optimizedUrl: string | null;

  constructor({ id, originalUrl, optimizedUrl }: InputAssetDto) {
    this.id = id;
    this.setOriginalUrl(originalUrl);
    this.setOptimizedUrl(optimizedUrl);
  }

  setOriginalUrl(url: string): void {
    if (!url) {
      throw new Error('url is required');
    }
    if (!typeCheck('String', url)) {
      throw new Error('Url should be a string');
    }
    this.originalUrl = url;
  }

  setOptimizedUrl(url?: string | null): void {
    if (!url) {
      this.optimizedUrl = null;
      return;
    }
    if (!typeCheck('String', url)) {
      throw new Error('Url should be a string');
    }
    this.optimizedUrl = url;
  }

  getData() {
    return {
      id: this.id,
      originalUrl: this.originalUrl,
      optimizedUrl: this.optimizedUrl,
    };
  }
}
