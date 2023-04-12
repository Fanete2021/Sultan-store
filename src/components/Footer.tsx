import React, { FC } from 'react'
import Sultan from '../../public/images/Sultan.png'
import Arrow from '../../public/images/Arrow.png'
import Download from '../../public/images/Download.png'
import WhatsApp from '../../public/images/WhatsApp.png'
import Telegram from '../../public/images/Telegram.png'
import Visa from '../../public/images/Visa.png'
import Mastercard from '../../public/images/Mastercard.png'
import '../styles/footer.scss'

interface ILink {
    description: string
}

const menuItems: ILink[] = [
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

const categoryItems: ILink[] = [
    {
        description: 'Бытовая химия',
    },
    {
        description: 'Косметика и гигиена',
    },
    {
        description: 'Товары для дома',
    },
    {
        description: 'Товары для детей и мам',
    },
    {
        description: 'Посуда',
    },
]

const Footer: FC = () => {
    return (
        <div className="footer">
            <div className="footer__content">
                <img className="footer__sultan" src={Sultan} alt=""></img>
                <div className="footer__describe">
                    Компания «Султан» — снабжаем розничные магазины товарами "под ключ" в Кокчетаве
                    и Акмолинской области
                </div>
                <div className="footer__promotions">
                    <div className="promotions__describe">Подпишись на скидки и акции</div>
                    <div className="promotions__input">
                        <input placeholder="Введите ваш E-mail"></input>
                        <div className="input__send">
                            <img src={Arrow} alt=""></img>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer__content">
                <div className="footer__links">
                    <div className="links__title">Меню сайта:</div>
                    {menuItems.map((item, index) => (
                        <div key={index} className="links__item">
                            {item.description}
                        </div>
                    ))}
                </div>
            </div>

            <div className="footer__content">
                <div className="footer__links">
                    <div className="links__title">Категории:</div>
                    {categoryItems.map((item, index) => (
                        <div key={index} className="links__item">
                            {item.description}
                        </div>
                    ))}
                </div>
            </div>

            <div className="footer__content">
                <div className="footer__price-list">
                    <div className="price-list__title">Скачать прайс-лист:</div>
                    <div className="price-list__bottom">
                        <div className="bottom__description">Прайс-лист</div>
                        <img src={Download} alt="" />
                    </div>
                </div>
                <div className="footer__social-network">
                    <div className="social-network__title">Связь в мессенджерах</div>
                    <div className="social-network__links">
                        <img src={WhatsApp} alt="" />
                        <img src={Telegram} alt="" />
                    </div>
                </div>
            </div>

            <div className="footer__content">
                <div className="footer__contacts">
                    <div className="contacts__title">Контакты:</div>
                    <div className="contacts__phone">+7 (777) 490-00-91</div>
                    <div className="contacts__schedule">время работы: 9:00-20:00</div>
                    <div className="contacts__call">Заказать звонок</div>
                    <div className="contacts__email">
                        <div className="email__content">opt.sultan@mail.ru</div>
                        <div className="email__schedule">На связи в любое время</div>
                    </div>
                </div>

                <div className="footer__payment">
                    <img src={Visa} alt="" />
                    <img src={Mastercard} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Footer
