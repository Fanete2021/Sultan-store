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
import { Link } from 'react-router-dom'
import { cartPageURL, catalogPageURL } from '../constants'
import { selectCart } from '../store/reducers/Selectors'
import '../styles/header.scss'

interface IContact {
    img: string
    title: string
    description: string
}

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

interface ILink {
    description: string
}

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

const Header: FC = () => {
    const cart = selectCart()

    return (
        <div className="header">
            <div className="header__burger">
                <img src={Burger} alt="" />
            </div>

            <div className="header__info">
                <div className="info__contacts">
                    {contacts.map((contact, index) => (
                        <div key={index} className="info__contact">
                            <img src={contact.img} alt=""></img>

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
                        <img src={Sultan} alt=""></img>
                    </div>

                    <Link to={`${catalogPageURL}`}>
                        <div className="active__catalog">
                            <span>Каталог</span>
                            <img src={Catalog} alt=""></img>
                        </div>
                    </Link>

                    <div className="active__search">
                        <input placeholder="Поиск..."></input>
                        <div className="search__icon">
                            <img src={Magnifier} alt=""></img>
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
                        <img src={Consultant} alt=""></img>
                    </div>

                    <div className="right__separation">
                        <div className="active__price-list">
                            <span>Прайс-лист</span>
                            <img src={Download} alt=""></img>
                        </div>
                    </div>

                    <Link to={`${cartPageURL}`}>
                        <div className="active__cart">
                            <img src={Cart} alt=""></img>
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
