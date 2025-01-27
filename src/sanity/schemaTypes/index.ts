import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { cart } from './cart'
import { cartItem } from './cartItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, cart, cartItem],
}
