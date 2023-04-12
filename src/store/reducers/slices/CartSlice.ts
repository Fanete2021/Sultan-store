import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICart, ICartItem } from '../../../models/ICart'

const initialState: ICart = {
    items: [],
    priceAll: 0,
    countAll: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ICartItem>) {
            const index = state.items.findIndex(
                (item) => item.product.id === action.payload.product.id
            )

            if (index >= 0) {
                state.items[index].count += action.payload.count
            } else {
                state.items.push(action.payload)
            }

            state.priceAll += action.payload.count * action.payload.product.price
            state.countAll += action.payload.count
        },
        deleteItemById(state, action: PayloadAction<number>) {
            const product: ICartItem | undefined = state.items.find(
                (item) => item.product.id === action.payload
            )

            if (product) {
                state.priceAll -= product.count * product.product.price
                state.countAll -= product.count
                state.items = state.items.filter((item) => item.product.id !== action.payload)
            }
        },
        decreaseCountItemById(state, action: PayloadAction<number>) {
            const index = state.items.findIndex((item) => item.product.id === action.payload)

            if (index >= 0) {
                state.priceAll -= state.items[index].product.price
                state.countAll -= 1

                if (state.items[index].count === 1) {
                    state.items.splice(index, 1)
                } else {
                    state.items[index].count -= 1
                }
            }
        },
        increaseCountItemById(state, action: PayloadAction<number>) {
            const index = state.items.findIndex((item) => item.product.id === action.payload)

            if (index >= 0) {
                state.priceAll += state.items[index].product.price
                state.countAll += 1
                state.items[index].count += 1
            }
        },
        clearCart(state) {
            state.items.splice(0, state.items.length)
            state.priceAll = 0
            state.countAll = 0
        },
    },
})

export default cartSlice.reducer
