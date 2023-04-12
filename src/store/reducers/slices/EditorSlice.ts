import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEditor } from '../../../models/IEditor'
import { IProduct } from '../../../models/IProduct'

const initialState: IEditor = {
    product: undefined,
    isShowing: false,
}

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setEditableProduct(state, action: PayloadAction<IProduct>) {
            state.product = action.payload
        },
        deleteEditableProduct(state) {
            state.product = undefined
        },
        changeShowing(state, action: PayloadAction<boolean>) {
            state.isShowing = action.payload
        },
    },
})

export default editorSlice.reducer
