import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../../models/IProduct'
import {
    addProductToLocalStorage,
    deleteProductFromLocalStorage,
    updateProductInLocalStorage,
} from '../../utils/localStorage'
import { fetchProducts } from './ActionCreators'
import db from '../../../db.json'

interface IProductState {
    products: IProduct[]
    isLoading: boolean
    error: string
}

const initialState: IProductState = {
    products: [],
    isLoading: false,
    error: '',
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        changeProduct(state, action: PayloadAction<IProduct>) {
            const index = state.products.findIndex((item) => item.id === action.payload.id)

            if (index >= 0) {
                state.products[index] = action.payload
                updateProductInLocalStorage(action.payload)
            }
        },
        addProduct(state, action: PayloadAction<IProduct>) {
            state.products.push(action.payload)
            addProductToLocalStorage(action.payload)
        },
        deleteProductById(state, action: PayloadAction<number>) {
            state.products = state.products.filter((item) => item.id !== action.payload)
            deleteProductFromLocalStorage(action.payload)

            if (state.products.length === 0) {
                state.products = Object.values(db).map((product) => ({ ...product } as IProduct))
            }
        },
    },
    extraReducers: {
        [fetchProducts.fulfilled.type]: (state, action: PayloadAction<IProduct[]>) => {
            state.isLoading = false
            state.error = ''
            state.products = action.payload
        },
        [fetchProducts.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchProducts.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    },
})

export default productSlice.reducer
