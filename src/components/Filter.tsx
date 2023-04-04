import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IBrand } from '../models/IBrand'
import { filterProductsSlice } from '../store/reducers/FilterProductsSlice'
import Show from '../../public/images/Show.png'
import Magnifier from '../../public/images/Magnifier.png'
import { categories } from '../types/categories'

interface FilterProps {
    brands: IBrand[]
}

const Filter: FC<FilterProps> = ({ brands }) => {
    const [priceMin, setPriceMin] = useState<number>(0)
    const [priceMax, setPriceMax] = useState<number>(10000)
    const [filteredBrands, setFilteredBrands] = useState<IBrand[]>([])
    const [brand, setBrand] = useState<string>('')
    const [isShowFullBrands, setIsShowFullBrands] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const { changeMinPrice, changeMaxPrice, changeBrands, changeSubcategories, changeCategory } =
        filterProductsSlice.actions
    const filterProducts = useAppSelector((state) => state.filterProductsReducer)

    useEffect(() => {
        setPriceMin(filterProducts.minPrice)
        setPriceMax(filterProducts.maxPrice)
    }, [])

    useEffect(() => {
        if (brand) {
            setFilteredBrands(
                brands.filter((item) => item.title.toLowerCase().includes(brand.toLowerCase()))
            )
        } else {
            setFilteredBrands(brands)
        }
    }, [brands, brand])

    const minInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriceMin(+e.target.value)
        dispatch(changeMinPrice(+e.target.value))
    }

    const maxInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriceMax(+e.target.value)
        dispatch(changeMaxPrice(+e.target.value))
    }

    const brandInputHandler = (e: React.ChangeEvent<HTMLInputElement>, title: string) => {
        if (e.target.checked) {
            dispatch(changeBrands([...filterProducts.brands, title]))
        } else {
            dispatch(changeBrands(filterProducts.brands.filter((brand) => brand !== title)))
        }
    }

    const showFullBrands = () => {
        setIsShowFullBrands(!isShowFullBrands)
    }

    const subcategoryDivHandler = (category: string, subcategory: string) => {
        const isSelected: boolean = filterProducts.subcategories.indexOf(subcategory) >= 0

        if (!filterProducts.subcategories.length && filterProducts.category !== category) {
            dispatch(changeCategory(category))
        }

        if (isSelected) {
            dispatch(
                changeSubcategories(
                    filterProducts.subcategories.filter((item) => subcategory !== item)
                )
            )
        } else {
            dispatch(changeSubcategories([...filterProducts.subcategories, subcategory]))
        }
    }

    return (
        <div className="filter">
            <div className="filter__title">Подбор по параметрам</div>

            <div className="filter__price">
                <div className="price__title">
                    <div className="title__description">Цена</div>
                    <div className="title__currency">₸</div>
                </div>
                <div className="price__inputs">
                    <input
                        className="inputs__field"
                        onChange={minInputChangeHandler}
                        value={priceMin}
                    ></input>
                    <div className="inputs__separation">-</div>
                    <input
                        className="inputs__field"
                        onChange={maxInputChangeHandler}
                        value={priceMax}
                    ></input>
                </div>
            </div>

            <div className="filter__brand">
                <div className="brand__title">Бренд</div>
                <div className="brand__search">
                    <input
                        onChange={(e) => setBrand(e.target.value)}
                        value={brand}
                        placeholder="Поиск..."
                    ></input>
                    <div className="search__icon">
                        <img src={Magnifier}></img>
                    </div>
                </div>
                <div className="brand__checkbox">
                    {filteredBrands.slice(0, 4).map((brand, index) => (
                        <div key={index} className="checkbox__item">
                            <input
                                onChange={(e) => brandInputHandler(e, brand.title)}
                                type="checkbox"
                                checked={filterProducts.brands.indexOf(brand.title) >= 0}
                            ></input>
                            <div className="item__title">{brand.title}</div>
                            <div className="item__count">({brand.count})</div>
                        </div>
                    ))}

                    {filteredBrands.length >= 4 && (
                        <div className="checkbox__more">
                            <div className="more__show">
                                <div onClick={showFullBrands} className="show__description">
                                    Показать все
                                </div>
                                <img
                                    className={isShowFullBrands ? 'show__rotate' : ''}
                                    onClick={showFullBrands}
                                    src={Show}
                                />
                            </div>
                            {isShowFullBrands &&
                                filteredBrands.slice(4).map((brand, index) => (
                                    <div key={index} className="checkbox__item">
                                        <input
                                            onChange={(e) => brandInputHandler(e, brand.title)}
                                            type="checkbox"
                                            checked={
                                                filterProducts.brands.indexOf(brand.title) >= 0
                                            }
                                        ></input>
                                        <div className="item__title">{brand.title}</div>
                                        <div className="item__count">({brand.count})</div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="filter__tags">
                {categories.slice(0, 1).map((category, indexCat) => (
                    <div key={indexCat} className="tags__content">
                        <div className="content__title">{category.category}</div>
                        {category.subcategories.map((subcategory, indexSub) => (
                            <div
                                key={indexSub}
                                className={
                                    filterProducts.subcategories.includes(subcategory)
                                        ? 'content__item content__item-active'
                                        : 'content__item'
                                }
                                onClick={(e) =>
                                    subcategoryDivHandler(category.category, subcategory)
                                }
                            >
                                {subcategory}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filter
