import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import productReducer from './reducers/slices/ProductSlice'
import filterProductsReducer from './reducers/slices/FilterProductsSlice'
import cartReducer from './reducers/slices/CartSlice'
import editorReducer from './reducers/slices/EditorSlice'
import categoryReducer from './reducers/slices/CategorySlice'

const rootReducer = combineReducers({
    productReducer,
    filterProductsReducer,
    cartReducer,
    editorReducer,
    categoryReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
