import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFilterProducts, ISort } from '../../../models/IFilterProducts'

const initialState: IFilterProducts = {
    brands: [],
    minPrice: 0,
    maxPrice: 10000,
    category: 0,
    sort: {
        key: 'Название',
        isDecreasing: false,
    },
    subcategories: [],
}

export const filterProductsSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeBrands(state, action: PayloadAction<string[]>) {
            state.brands = action.payload
        },
        changeMinPrice(state, action: PayloadAction<number>) {
            state.minPrice = action.payload
        },
        changeMaxPrice(state, action: PayloadAction<number>) {
            state.maxPrice = action.payload
        },
        changeCategory(state, action: PayloadAction<number>) {
            state.category = action.payload
            state.subcategories = []
        },
        changeSort(state, action: PayloadAction<ISort>) {
            state.sort = action.payload
        },
        changeSubcategories(state, action: PayloadAction<number[]>) {
            state.subcategories = action.payload
        },
    },
})

export default filterProductsSlice.reducer
