import React, { useEffect, useState } from 'react'
import Show from '../../public/images/Show.png'
import Add from '../../public/images/Add.png'
import Editor from '../components/Editor'
import Filter from '../components/Filter'
import List from '../components/List'
import Product from '../components/Product'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IBrand } from '../models/IBrand'
import { IProduct } from '../models/IProduct'
import { filterProductsSlice } from '../store/reducers/FilterProductsSlice'
import { categories } from '../types/categories'
import { calculateBrands } from '../utils/brands'
import { sortProducts } from '../utils/sortProducts'
import { editorSlice } from '../store/reducers/EditorSlice'

function Catalog() {
    const [subpage, setSubpage] = useState<string>('Косметика и гигиена')
    const [brands, setBrands] = useState<IBrand[]>([])

    const dispatch = useAppDispatch()
    const { products } = useAppSelector((state) => state.productReducer)

    const filterProducts = useAppSelector((state) => state.filterProductsReducer)
    const { changeCategory, changeSort } = filterProductsSlice.actions

    const { isShowing } = useAppSelector((state) => state.editorReducer)
    const { changeShowing, deleteEditableProduct } = editorSlice.actions

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

    const filterClickHandler = (e: React.MouseEvent<HTMLDivElement>, title: string) => {
        let isSelected: boolean = filterProducts.category === title

        if (isSelected) {
            dispatch(changeCategory(''))
        } else {
            dispatch(changeCategory(title))
        }
    }

    return (
        <div className="catalog">
            <div className="catalog__page">
                <div className="page__title">Главная</div>
                <div className="page__subpage">{subpage}</div>
            </div>

            <div className="catalog__view">
                <div className="view__top">
                    <div className="view__left-part">
                        <div className="view__subpage">
                            <span>{subpage}</span>
                        </div>
                        <div
                            className="view__add-product"
                            onClick={(e) => {
                                dispatch(deleteEditableProduct())
                                dispatch(changeShowing(true))
                            }}
                        >
                            <img src={Add} />
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
                        />
                    </div>
                </div>

                <div className="view__bottom">
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            className={
                                filterProducts.category === item.category
                                    ? 'view__filter-item view__filter-item-active'
                                    : 'view__filter-item'
                            }
                            onClick={(e) => filterClickHandler(e, item.category)}
                        >
                            <span>{item.category}</span>
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
