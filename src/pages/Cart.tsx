import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { cartSlice } from '../store/reducers/CartSlice'
import Bottle from '../../public/images/Bottle.png'
import Box from '../../public/images/Box.png'
import Trash from '../../public/images/Trash.png'

function Cart() {
    const dispatch = useAppDispatch()
    const cart = useAppSelector((state) => state.cartReducer)
    const { deleteItemById, clearCart, decreaseCountItemById, increaseCountItemById } =
        cartSlice.actions

    return (
        <div className="cart">
            <div className="cart__pages">
                <div className="pages__main">
                    <Link to={`/Sultan-store/catalog`}>Главная</Link>
                </div>
                <div className="pages__current">Корзина</div>
            </div>

            <div className="cart__title">Корзина</div>

            <div className="cart__items">
                {cart.items.map((item) => (
                    <div className="items__item">
                        <img className="item__image" src={item.product.urlImage} />
                        <div className="item__info">
                            <div className="info__size">
                                <img src={item.product.sizeType.indexOf('л') >= 0 ? Bottle : Box} />
                                <div className="size__value">
                                    {item.product.size} {item.product.sizeType}
                                </div>
                            </div>
                            <div className="info__description">
                                {item.product.title} {item.product.description}
                            </div>
                            <div className="info__full-description">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque vel,
                                dicta in sapiente, vitae quam nam maiores, quibusdam tempora quis
                                asperiores iste esse eos magnam suscipit deserunt modi molestias
                                perspiciatis!
                            </div>
                        </div>
                        <div className="item__actions">
                            <div className="actions__change-count">
                                <div
                                    className="change-count__decrease"
                                    onClick={() => dispatch(decreaseCountItemById(item.product.id))}
                                >
                                    -
                                </div>
                                <div className="change-count__count">{item.count}</div>
                                <div
                                    className="change-count__increase"
                                    onClick={() => dispatch(increaseCountItemById(item.product.id))}
                                >
                                    +
                                </div>
                            </div>
                            <div className="actions__price">
                                {item.count * item.product.price} ₸
                            </div>
                            <div
                                className="actions__delete"
                                onClick={() => dispatch(deleteItemById(item.product.id))}
                            >
                                <img src={Trash} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart__bottom">
                <div
                    className="cart__order"
                    onClick={() => {
                        dispatch(clearCart())
                        if (cart.countAll > 0) {
                            alert('Спасибо за заказ')
                        }
                    }}
                >
                    Оформить заказ
                </div>
                <div className="cart__price-all">{cart.priceAll} ₸</div>
            </div>
        </div>
    )
}

export default Cart
