import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../hooks/redux'
import { cartSlice } from '../store/reducers/slices/CartSlice'
import Bottle from '../../public/images/Bottle.png'
import Box from '../../public/images/Box.png'
import Trash from '../../public/images/Trash.png'
import { catalogPageURL } from '../constants'
import { selectCart } from '../store/reducers/Selectors'
import PagesLinks from '../components/PagesLinks'
import '../styles/cart.scss'

function Cart() {
    const dispatch = useAppDispatch()
    const cart = selectCart()
    const { deleteItemById, clearCart, decreaseCountItemById, increaseCountItemById } =
        cartSlice.actions

    return (
        <div className="cart">
            <PagesLinks>
                <Link to={`${catalogPageURL}`}>Главная</Link>
                <div>Корзина</div>
            </PagesLinks>

            <div className="cart__title">Корзина</div>

            <div className="cart__items">
                {cart.items.map((item) => (
                    <div className="items__item">
                        <img className="item__image" src={item.product.urlImage} alt="" />
                        <div className="item__info">
                            <div className="info__size">
                                <img
                                    src={item.product.sizeType.indexOf('л') >= 0 ? Bottle : Box}
                                    alt=""
                                />
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
                                <img src={Trash} alt="" />
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
