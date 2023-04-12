export interface IFilterProducts {
    brands: string[]
    minPrice: number
    maxPrice: number
    category: number
    sort: ISort
    subcategories: number[]
}

export interface ISort {
    key: string
    isDecreasing: boolean
}
