import { Asset } from "./asset"

export interface Category {
  id: number
  name: string
  image?: Asset
  slug: string
  title?: string
  description?: string
  tags: Array<string>
}

export interface CreateCategory {
  name: string
  image?: Asset
  slug: string
  title?: string
  description?: string
  tags: Array<string>
}