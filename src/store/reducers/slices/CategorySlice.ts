import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchCategories } from '../ActionCreators'
import { ICategory } from '../../../models/ICategory'

export interface ICategoryState {
    categories: ICategory[]
    isLoading: boolean
    error: string
}

const initialState: ICategoryState = {
    categories: [],
    isLoading: false,
    error: '',
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCategories.fulfilled.type]: (state, action: PayloadAction<ICategory[]>) => {
            state.isLoading = false
            state.error = ''
            state.categories = action.payload
        },
        [fetchCategories.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchCategories.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    },
})

export default categorySlice.reducer
