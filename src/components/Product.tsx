import React, { FC, useState } from 'react'
import { IProduct } from '../models/IProduct'
import Cart from '../../public/images/Cart.png'
import Bottle from '../../public/images/Bottle.png'
import Box from '../../public/images/Box.png'
import Edit from '../../public/images/Edit.png'
import { Link } from 'react-router-dom'
import { cartSlice } from '../store/reducers/CartSlice'
import { useAppDispatch } from '../hooks/redux'
import { ICartItem } from '../models/ICart'
import Editor from './Editor'
import { editorSlice } from '../store/reducers/EditorSlice'

interface ProductProps {
    product: IProduct
}

const Product: FC<ProductProps> = ({ product }) => {
    const dispatch = useAppDispatch()
    const { addItem } = cartSlice.actions

    const { changeShowing, setEditableProduct } = editorSlice.actions

    return (
        <div className="product">
            <div className="product__image">
                <Link to={`/Sultan-store/catalog/` + product.id}>
                    <img src={product.urlImage}></img>
                </Link>
            </div>

            <div className="product__wrapper">
                <div className="product__size">
                    <img src={product.sizeType.indexOf('л') >= 0 ? Bottle : Box} />
                    <div className="size__value">
                        {product.size} {product.sizeType}
                    </div>
                </div>

                <div className="product__name">
                    <span className="name__title">
                        <b>{product.title}</b>
                    </span>{' '}
                    {product.description}
                </div>

                <div className="product__barcode">
                    <span className="description">Штрихкод:</span>
                    {' ' + product.barcode}
                </div>
                <div className="product__manufacturer">
                    <span className="description">Производитель:</span>
                    {' ' + product.manufacturer}
                </div>
                <div className="product__brand">
                    <span className="description">Бренд:</span>
                    {' ' + product.brand}
                </div>

                <div className="product__actions">
                    <div className="actions__price">{product.price} ₸</div>
                    <div
                        onClick={() => {
                            const cartItem: ICartItem = {
                                product: product,
                                count: 1,
                            }
                            dispatch(addItem(cartItem))
                        }}
                        className="actions__button"
                    >
                        <div className="button__description">В корзину</div>
                        <img src={Cart} />
                    </div>
                    <img
                        onClick={() => {
                            dispatch(setEditableProduct(product))
                            dispatch(changeShowing(true))
                        }}
                        className="actions__edit"
                        src={Edit}
                    />
                </div>
            </div>
        </div>
    )
}

export default Product
