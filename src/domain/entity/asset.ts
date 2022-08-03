export interface Asset {
  id: number
  owner: number;
  originalUrl: string;
  optimizedUrl?: string;
}

export interface CreateAsset {
  owner: number;
  originalUrl: string;
  optimizedUrl?: string;
}