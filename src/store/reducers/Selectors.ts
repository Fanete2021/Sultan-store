/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from '../../hooks/redux'
import { RootState } from '../store'

export const selectCart = () => useAppSelector((state: RootState) => state.cartReducer)

export const selectFilterProducts = () =>
    useAppSelector((state: RootState) => state.filterProductsReducer)

export const selectProducts = () => useAppSelector((state: RootState) => state.productReducer)

export const selectEditor = () => useAppSelector((state: RootState) => state.editorReducer)

export const selectCategories = () => useAppSelector((state: RootState) => state.categoryReducer)
