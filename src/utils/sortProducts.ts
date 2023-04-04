import { IFilterProducts } from '../models/IFilterProducts'
import { IProduct } from '../models/IProduct'

export const sortProducts = (products: IProduct[], filter: IFilterProducts): IProduct[] => {
    const { category, maxPrice, minPrice, sort, subcategories } = filter
    let sortedProducts: IProduct[] = []

    if (sort.key === 'Название') {
        sortedProducts = [...products].sort((a, b) =>
            sort.isDecreasing ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
        )
    } else if (sort.key === 'Цена') {
        sortedProducts = [...products].sort((a, b) =>
            sort.isDecreasing ? b.price - a.price : a.price - b.price
        )
    }

    sortedProducts = sortedProducts.filter(
        (product) =>
            (!category || product.categories.includes(category)) &&
            product.price >= minPrice &&
            product.price <= maxPrice &&
            (!subcategories.length || subcategories.indexOf(product.subcategory) >= 0)
    )

    return sortedProducts
}
