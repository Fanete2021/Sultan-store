import React, { FC } from 'react'
import { IProduct } from '../models/IProduct'
import Cart from '../../public/images/Cart.png'
import Bottle from '../../public/images/Bottle.png'
import Box from '../../public/images/Box.png'
import Edit from '../../public/images/Edit.png'
import { Link } from 'react-router-dom'
import { cartSlice } from '../store/reducers/slices/CartSlice'
import { useAppDispatch } from '../hooks/redux'
import { ICartItem } from '../models/ICart'
import { editorSlice } from '../store/reducers/slices/EditorSlice'
import { catalogPageURL } from '../constants'
import '../styles/product.scss'

interface ProductProps {
    product: IProduct
}

const Product: FC<ProductProps> = ({ product }) => {
    const dispatch = useAppDispatch()
    const { addItem } = cartSlice.actions

    const { changeShowing, setEditableProduct } = editorSlice.actions

    const addToCartClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const cartItem: ICartItem = {
            product: product,
            count: 1,
        }
        dispatch(addItem(cartItem))
    }

    const editCartClickHandler = (e: React.MouseEvent<HTMLImageElement>) => {
        dispatch(setEditableProduct(product))
        dispatch(changeShowing(true))
    }

    return (
        <div className="product">
            <div className="product__image">
                <Link to={`${catalogPageURL}/` + product.id}>
                    <img src={product.urlImage} alt=""></img>
                </Link>
            </div>

            <div className="product__wrapper">
                <div className="product__size">
                    <img src={product.sizeType.indexOf('л') >= 0 ? Bottle : Box} alt="" />
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
                    <div onClick={addToCartClickHandler} className="actions__button">
                        <div className="button__description">В корзину</div>
                        <img src={Cart} alt="" />
                    </div>
                    <img
                        onClick={editCartClickHandler}
                        className="actions__edit"
                        src={Edit}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default Product
