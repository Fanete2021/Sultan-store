import { IProduct } from '../models/IProduct'

const nameItemLocalStorage = 'products'

export function getProductsFromLocalStorage(): IProduct[] {
    const data = localStorage.getItem(nameItemLocalStorage)

    if (data) {
        return JSON.parse(data)
    }

    return []
}

export function addProductToLocalStorage(product: IProduct) {
    const data = localStorage.getItem(nameItemLocalStorage)

    if (data) {
        const products: IProduct[] = JSON.parse(data)
        products.push(product)
        localStorage.setItem(nameItemLocalStorage, JSON.stringify(products))
    }
}

export function uploadProductsFromLocalStorage(products: IProduct[]) {
    localStorage.setItem(nameItemLocalStorage, JSON.stringify(products))
}

export function updateProductInLocalStorage(product: IProduct) {
    const data = localStorage.getItem(nameItemLocalStorage)

    if (data) {
        const products: IProduct[] = JSON.parse(data)
        const index = products.findIndex((item) => item.id === product.id)

        if (index >= 0) {
            products.splice(index, 1, product)
            localStorage.setItem(nameItemLocalStorage, JSON.stringify(products))
        }
    }
}

export function deleteProductFromLocalStorage(id: number) {
    const data = localStorage.getItem(nameItemLocalStorage)

    if (data) {
        const products: IProduct[] = JSON.parse(data)
        const index = products.findIndex((item) => item.id === id)

        if (index >= 0) {
            products.splice(index, 1)
            localStorage.setItem(nameItemLocalStorage, JSON.stringify(products))
        }
    }
}

export function checkItemInLocalStorage(): boolean {
    return localStorage.getItem(nameItemLocalStorage) !== null
}
