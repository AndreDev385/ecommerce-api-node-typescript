import { Asset } from "./asset";

export interface Brand {
  id: number;
  name: string;
  description?: string;
  image?: Asset;
}

export interface CreateBrand {
  name: string;
  description?: string;
  image?: Asset;
}
