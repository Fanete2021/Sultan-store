import { IBrand } from '../models/IBrand'
import { IProduct } from '../models/IProduct'

export const calculateBrands = (products: IProduct[]): IBrand[] => {
    const brands: IBrand[] = []

    for (let { brand } of products) {
        let index = brands.findIndex((item) => item.title === brand)

        if (index >= 0) {
            brands[index].count++
        } else {
            brands.push({
                title: brand,
                count: 1,
            })
        }
    }

    return brands
}
