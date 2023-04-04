import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import productReducer from './reducers/ProductSlice'
import filterProductsReducer from './reducers/FilterProductsSlice'
import cartReducer from './reducers/CartSlice'
import editorReducer from './reducers/EditorSlice'

const rootReducer = combineReducers({
    productReducer,
    filterProductsReducer,
    cartReducer,
    editorReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
