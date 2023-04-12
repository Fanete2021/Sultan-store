import { IProduct } from '../../models/IProduct'
import productsDB from '../../../data/products.json'
import categoriesDB from '../../../data/categories.json'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    checkItemInLocalStorage,
    getProductsFromLocalStorage,
    uploadProductsFromLocalStorage,
} from '../../utils/localStorage'
import { ICategory } from '../../models/ICategory'

export const fetchProducts = createAsyncThunk('product/fetchAll', async (_, thunkAPI) => {
    try {
        let products: IProduct[] = []

        if (checkItemInLocalStorage()) {
            products = getProductsFromLocalStorage()

            if (products.length > 0) {
                return products
            }
        }

        products = Object.values(productsDB).map((product) => ({ ...product } as IProduct))

        uploadProductsFromLocalStorage(products)

        return products
    } catch (e: any) {
        return thunkAPI.rejectWithValue('Не удалось загрузить список товаров')
    }
})

export const fetchCategories = createAsyncThunk('category/fetchAll', async (_, thunkAPI) => {
    try {
        let categories: ICategory[] = Object.values(categoriesDB).map(
            (category) => ({ ...category } as ICategory)
        )

        return categories
    } catch (e: any) {
        return thunkAPI.rejectWithValue('Не удалось загрузить список категорий')
    }
})
