import { ReadAssetDTO } from "../../domain/entity/asset";
import { Brand, ReadBrandDTO } from "../../domain/entity/brand";
import { Category, ReadCategoryDTO } from "../../domain/entity/category";
import { Order, ReadOrderDTO } from "../../domain/entity/order";
import { Product, ReadProductDTO } from "../../domain/entity/product";
import { ReadUserDTO, User } from "../../domain/entity/user";
import {
  Attribute,
  ReadVariationDTO,
  Variation,
} from "../../domain/entity/variation";

export function CreateReadBrandDTO(brand: Brand) {
  return new ReadBrandDTO(
    brand.id,
    brand.name,
    brand.description,
    brand.products
      ? brand.products.map(
          ({ id, brandId, categoryId, name, description, tags }) =>
            new Product(id, name, brandId, categoryId, description, tags)
        )
      : [],
    brand.asset
  );
}

export function CreateReadCategoryDTO(category: Category) {
  return new ReadCategoryDTO(
    category.id,
    category.name,
    category.slug,
    category.description,
    category.tags,
    category.products
      ? category.products.map(
          ({ id, brandId, categoryId, name, description, tags }) =>
            new Product(id, name, brandId, categoryId, description, tags)
        )
      : [],
    category.asset
  );
}

export function CreateProductDTO(product: Product) {
  return new ReadProductDTO(
    product.id,
    product.name,
    product.brandId,
    product.categoryId,
    product.description,
    product.tags,
    product.asset
      ? new ReadAssetDTO(
          product.asset.id,
          product.asset.originalUrl,
          product.asset.optimizedUrl
        )
      : product.asset,
    product.variations
      ? product.variations.map((variation) => CreateReadVariationDTO(variation))
      : []
  );
}

export function CreateReadVariationDTO(variation: Variation) {
  return new ReadVariationDTO(
    variation.id,
    variation.productId,
    variation.normalPrice,
    variation.offerPrice,
    variation.stock,
    variation.isAvaible,
    variation.attributes
      ? variation.attributes.map((a) => new Attribute(a.name, a.value))
      : [],
    variation.assets
      ? variation.assets.map(
          (a) => new ReadAssetDTO(a.id, a.originalUrl, a.optimizedUrl)
        )
      : []
  );
}

export function CreateReadUserDTO(user: User) {
  return new ReadUserDTO(
    user.id,
    user.name,
    user.email,
    user.role,
    user.phoneNumber
  );
}

export function CreateReadOrderDTO(order: Order) {
  return new ReadOrderDTO(
    order.id,
    order.userId,
    order.variations
      ? order.variations.map((v) => CreateReadVariationDTO(v))
      : order.variations,
    order.totalPrice,
    order.status
  );
}
