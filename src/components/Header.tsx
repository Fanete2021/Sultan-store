import React, { FC, useState } from 'react'
import Location from '../../public/images/Location.png'
import Email from '../../public/images/Email.png'
import Sultan from '../../public/images/Sultan.png'
import Catalog from '../../public/images/Catalog.png'
import Magnifier from '../../public/images/Magnifier.png'
import Consultant from '../../public/images/Consultant.png'
import Download from '../../public/images/Download.png'
import Cart from '../../public/images/Cart.png'
import Burger from '../../public/images/Burger.png'
import { useAppSelector } from '../hooks/redux'
import { Link } from 'react-router-dom'

interface IContact {
    img: string
    title: string
    description: string
}

interface ILink {
    description: string
}

const Header: FC = () => {
    const contacts: IContact[] = [
        {
            img: Location,
            title: 'г. Кокчетав, ул. Ж. Ташенова 129Б',
            description: '(Рынок Восточный)',
        },
        {
            img: Email,
            title: 'opt.sultan@mail.ru',
            description: 'На связи в любое время',
        },
    ]

    const links: ILink[] = [
        {
            description: 'О компании',
        },
        {
            description: 'Доставка и оплата',
        },
        {
            description: 'Возврат',
        },
        {
            description: 'Контакты',
        },
    ]

    const cart = useAppSelector((state) => state.cartReducer)

    return (
        <div className="header">
            <div className="header__burger">
                <img src={Burger} />
            </div>

            <div className="header__info">
                <div className="info__contacts">
                    {contacts.map((contact, index) => (
                        <div key={index} className="info__contact">
                            <img src={contact.img}></img>

                            <div>
                                <span className="contact__title">{contact.title}</span>
                                <br />
                                <span className="contact__description">{contact.description}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="info__links">
                    {links.map((link, index) => (
                        <span key={index} className="info__link">
                            {link.description}
                        </span>
                    ))}
                </div>
            </div>

            <div className="header__separation"></div>

            <div className="header__active">
                <div className="active__left">
                    <div className="active__image-company">
                        <img src={Sultan}></img>
                    </div>

                    <Link to={`/Sultan-store/catalog`}>
                        <div className="active__catalog">
                            <span>Каталог</span>
                            <img src={Catalog}></img>
                        </div>
                    </Link>

                    <div className="active__search">
                        <input placeholder="Поиск..."></input>
                        <div className="search__icon">
                            <img src={Magnifier}></img>
                        </div>
                    </div>
                </div>

                <div className="active__right">
                    <div className="active__consultant">
                        <div className="consultant__info">
                            <div className="info__phone">+7 (777) 490-00-91</div>
                            <div className="info__schedule">время работы: 9:00-20:00</div>
                            <div className="info__call">Заказать звонок</div>
                        </div>
                        <img src={Consultant}></img>
                    </div>

                    <div className="right__separation">
                        <div className="active__price-list">
                            <span>Прайс-лист</span>
                            <img src={Download}></img>
                        </div>
                    </div>

                    <Link to={`/Sultan-store/cart`}>
                        <div className="active__cart">
                            <img src={Cart}></img>
                            <div className="active__cart__items">{cart.countAll}</div>
                            <div className="active__cart__total">
                                <div className="active__cart__title">Корзина</div>
                                <div className="active__cart__order-amount">{cart.priceAll} ₸</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="header__separation"></div>
        </div>
    )
}

export default Header
