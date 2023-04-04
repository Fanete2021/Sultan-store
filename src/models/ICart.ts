import { IProduct } from './IProduct'

export interface ICartItem {
    product: IProduct
    count: number
}

export interface ICart {
    items: ICartItem[]
    priceAll: number
    countAll: number
}
