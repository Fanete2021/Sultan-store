import { IProduct } from '../../models/IProduct'
import db from '../../../db.json'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    checkItemInLocalStorage,
    getProductsFromLocalStorage,
    uploadProductsFromLocalStorage,
} from '../../utils/localStorage'

//предполагается функция не для локального хранилища
export const fetchProducts = createAsyncThunk('product/fetchAll', async (_, thunkAPI) => {
    try {
        let products: IProduct[] = []

        if (checkItemInLocalStorage()) {
            products = getProductsFromLocalStorage()

            if (products.length > 0) {
                return products
            }
        }

        products = Object.values(db).map((product) => ({ ...product } as IProduct))

        uploadProductsFromLocalStorage(products)

        return products
    } catch (e: any) {
        return thunkAPI.rejectWithValue('Не удалось загрузить список товаров')
    }
})
