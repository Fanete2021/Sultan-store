import React, { useEffect, useState } from 'react'
import Show from '../../public/images/Show.png'
import Add from '../../public/images/Add.png'
import Editor from '../components/Editor'
import Filter from '../components/Filter'
import List from '../components/List'
import Product from '../components/Product'
import { useAppDispatch } from '../hooks/redux'
import { IBrand } from '../models/IBrand'
import { IProduct } from '../models/IProduct'
import { filterProductsSlice } from '../store/reducers/slices/FilterProductsSlice'
import { calculateBrands } from '../utils/brands'
import { editorSlice } from '../store/reducers/slices/EditorSlice'
import {
    selectCategories,
    selectEditor,
    selectFilterProducts,
    selectProducts,
} from '../store/reducers/Selectors'
import { sortProducts } from '../utils/sortProducts'
import PagesLinks from '../components/PagesLinks'
import '../styles/catalog.scss'

function Catalog() {
    const [brands, setBrands] = useState<IBrand[]>([])

    const dispatch = useAppDispatch()
    const { products } = selectProducts()

    const filterProducts = selectFilterProducts()
    const { changeCategory, changeSort } = filterProductsSlice.actions

    const { isShowing } = selectEditor()
    const { changeShowing, deleteEditableProduct } = editorSlice.actions

    const { categories } = selectCategories()

    const [sortedProducts, setSortedPoducts] = useState<IProduct[]>([])

    const filterByBrands = (products: IProduct[]): IProduct[] => {
        let tempProducts = products

        if (filterProducts.brands.length !== 0) {
            tempProducts = tempProducts.filter(
                (product) => filterProducts.brands.indexOf(product.brand) >= 0
            )
        }

        return tempProducts.length > 0 ? tempProducts : products
    }

    useEffect(() => {
        let tempProducts = sortProducts(products, filterProducts)

        setSortedPoducts(tempProducts)
        setBrands(calculateBrands(tempProducts))
    }, [products, filterProducts])

    const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(
            changeSort({
                key: e.target.value,
                isDecreasing: filterProducts.sort.isDecreasing,
            })
        )
    }

    const imageSortClickHandler = (e: React.MouseEvent<HTMLImageElement>) => {
        dispatch(
            changeSort({
                key: filterProducts.sort.key,
                isDecreasing: !filterProducts.sort.isDecreasing,
            })
        )
    }

    const filterClickHandler = (e: React.MouseEvent<HTMLDivElement>, category: number) => {
        let isSelected: boolean = filterProducts.category === category

        if (isSelected) {
            dispatch(changeCategory(0))
        } else {
            dispatch(changeCategory(category))
        }
    }

    const addProductClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(deleteEditableProduct())
        dispatch(changeShowing(true))
    }

    return (
        <div className="catalog">
            <PagesLinks>
                <div>Главная</div>
                <div>Косметика и гигиена</div>
            </PagesLinks>

            <div className="catalog__view">
                <div className="view__top">
                    <div className="view__left-part">
                        <div className="view__subpage">
                            <span>Косметика и гигиена</span>
                        </div>
                        <div className="view__add-product" onClick={addProductClickHandler}>
                            <img src={Add} alt="" />
                        </div>
                    </div>
                    <div className="view__sort">
                        <div className="sort__title">Сортировка:</div>
                        <select onChange={selectChangeHandler}>
                            <option>Название</option>
                            <option>Цена</option>
                        </select>

                        <img
                            onClick={imageSortClickHandler}
                            src={Show}
                            className={filterProducts.sort.isDecreasing ? '' : 'flip-horizontal'}
                            alt=""
                        />
                    </div>
                </div>

                <div className="view__bottom">
                    {categories.map(({ category, id }, index) => (
                        <div
                            key={index}
                            className={
                                filterProducts.category === id
                                    ? 'view__filter-item view__filter-item-active'
                                    : 'view__filter-item'
                            }
                            onClick={(e) => filterClickHandler(e, id)}
                        >
                            <span>{category}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="catalog__content">
                <Filter brands={brands}></Filter>
                <List
                    items={filterByBrands(sortedProducts)}
                    renderItem={(product: IProduct) => <Product product={product} />}
                />
            </div>

            {isShowing && <Editor />}
        </div>
    )
}

export default Catalog
