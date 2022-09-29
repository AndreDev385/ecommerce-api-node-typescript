import { Attribute } from '../../entity/variation';

export interface AttributeRepository {
  create: (attribute: Attribute) => Promise<Attribute>
  findAll: () => Promise<Attribute[]>
}
