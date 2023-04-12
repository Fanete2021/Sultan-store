export interface ISubcategory {
    title: string
    id: number
}

export interface ICategory {
    category: string
    subcategories: ISubcategory[]
    id: number
}
