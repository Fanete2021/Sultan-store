export interface IFilterProducts {
    brands: string[]
    minPrice: number
    maxPrice: number
    category: string
    sort: ISort
    subcategories: string[]
}

export interface ISort {
    key: string
    isDecreasing: boolean
}
