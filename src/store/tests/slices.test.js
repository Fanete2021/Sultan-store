const { setupStore } = require('../store')
const { cartSlice } = require('../reducers/slices/CartSlice')
const { fetchProducts } = require('../reducers/ActionCreators')
const { productSlice } = require('../reducers/slices/ProductSlice')

const product = {
    id: new Date().getTime(),
    urlImage: '',
    title: 'AOS',
    sizeType: 'г',
    size: '22',
    barcode: '1231314',
    manufacturer: 'AOS',
    brand: 'AOS',
    description: 'AOS',
    price: 100,
    categories: [2],
}

const store = setupStore()

describe('CartSlice', () => {
    it('should added a product to the cart', () => {
        const cartItem = { product, count: 1 }
        const { addItem } = cartSlice.actions

        store.dispatch(addItem(cartItem))
        const { cartReducer } = store.getState()

        expect(cartReducer.items[0]).toEqual(cartItem)
    })

    it('should deleted a product from the cart', () => {
        const { deleteItemById } = cartSlice.actions

        expect(store.getState().cartReducer.items.length).toEqual(1)

        store.dispatch(deleteItemById(product.id))
        expect(store.getState().cartReducer.items.length).toEqual(0)
    })
})

describe('ProductSlice', () => {
    it('should added a product', () => {
        const { addProduct } = productSlice.actions
        const currentLength = store.getState().productReducer.products.length

        store.dispatch(addProduct(product))

        expect(store.getState().productReducer.products.length).toBeGreaterThan(currentLength)
    })

    it('should delete a product', () => {
        const { deleteProductById } = productSlice.actions
        const currentLength = store.getState().productReducer.products.length

        store.dispatch(deleteProductById(product.id))

        expect(store.getState().productReducer.products.length).toBeGreaterThan(currentLength)
    })

    it('should load the data', async () => {
        const products = await fetchProducts()

        expect(products.length).toBeGreaterThan(0)
    })
})
