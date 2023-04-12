export interface IProduct {
    id: number
    urlImage: string
    title: string
    sizeType: string
    size: string
    barcode: string
    manufacturer: string
    brand: string
    description: string
    price: number
    categories: number[]
    subcategory?: number
}
