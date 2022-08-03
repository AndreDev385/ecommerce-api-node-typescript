import { Asset } from "./asset";

type Atribute = {
  name: string;
  value: string;
};

export class Variation {
  id: number
  productId: number;
  images?: Asset[];
  attributes: Array<Atribute>;
  normalPrice: number;
  offerPrice: number;
  stock: number;

  constructor(
    id: number,
    productId: number,
    images: Asset[] = [],
    attributes: Atribute[] = [],
    normalPrice: number,
    offerPrice: number,
    stock: number
  ) {
    this.id = id
    this.productId = productId
    this.images = images
    this.attributes = attributes
    this.normalPrice = normalPrice
    this.offerPrice = offerPrice
    this.stock = stock
  }
}

export interface CreateVariation {
    productId: number
    images?: Asset[]
    attributes?: Atribute[]
    normalPrice: number,
    offerPrice?: number,
    stock?: number
}
