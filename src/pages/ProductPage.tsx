import React, { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IProduct } from '../models/IProduct'
import Cart from '../../public/images/Cart.png'
import Bottle from '../../public/images/Bottle.png'
import Box from '../../public/images/Box.png'
import Share from '../../public/images/Share.png'
import Download from '../../public/images/Download.png'
import Show from '../../public/images/Show.png'
import { cartSlice } from '../store/reducers/CartSlice'
import { ICartItem } from '../models/ICart'

interface ProductPageParams {
    id: string
    [key: string]: string
}

const ProductPage: FC = () => {
    const params = useParams<ProductPageParams>()
    const { products } = useAppSelector((state) => state.productReducer)
    const [product, setProduct] = useState<IProduct | null>(null)
    const [countToPurchase, setCountToPurchase] = useState<number>(1)
    const [isShowDescription, setIsShowDescription] = useState<boolean>(true)
    const [isShowCharacteristics, setIsShowCharacteristics] = useState<boolean>(true)

    const dispatch = useAppDispatch()
    const { addItem } = cartSlice.actions

    useEffect(() => {
        let foundId = params.id || -1
        if (foundId !== -1) {
            const foundProduct = products.find((item) => item.id === +foundId)
            setProduct(foundProduct || null)
        }
    }, [products])

    return (
        <div className="product-page">
            <div className="product-page__path">
                <span className="path__main">Главная</span>
                <Link to={`/Sultan-store/catalog`}>
                    <span className="path__pages">Каталог</span>
                </Link>
                <span className="path__current-page">{product?.title}</span>
            </div>

            <div className="page__product">
                <div className="product__left">
                    <img src={product?.urlImage} />
                </div>

                <div className="product__right">
                    <div className="product__availability">В наличии</div>

                    <div className="pruduct__name">
                        <span className="name__title">
                            <b>{product?.title}</b>
                        </span>{' '}
                        {product?.description}
                    </div>

                    <div className="product__size">
                        <img
                            src={
                                product?.sizeType && product?.sizeType.indexOf('л') >= 0
                                    ? Bottle
                                    : Box
                            }
                        />
                        <div className="size__value">
                            {product?.size} {product?.sizeType}
                        </div>
                    </div>

                    <div className="page__product__buy">
                        <div className="page__buy__price">{product?.price} ₸</div>

                        <div className="page__buy__count">
                            <div
                                onClick={() =>
                                    setCountToPurchase(
                                        countToPurchase > 1 ? countToPurchase - 1 : 1
                                    )
                                }
                                className="count__decreace"
                            >
                                -
                            </div>
                            <div className="count__value">{countToPurchase}</div>
                            <div
                                onClick={() => setCountToPurchase(countToPurchase + 1)}
                                className="count__increace"
                            >
                                +
                            </div>
                        </div>

                        <div
                            className="page__buy__button"
                            onClick={() => {
                                if (product) {
                                    const cartItem: ICartItem = {
                                        product: product,
                                        count: countToPurchase,
                                    }
                                    dispatch(addItem(cartItem))
                                }
                            }}
                        >
                            <div className="button__description">В корзину</div>
                            <img src={Cart} />
                        </div>
                    </div>

                    <div className="product__activities">
                        <div className="activities__share">
                            <img src={Share} />
                        </div>
                        <div className="activities__promotion">
                            При покупке от <span>10 000 ₸</span> бесплатная <br />
                            доставка по Кокчетаву и области
                        </div>
                        <div className="activities__price-list">
                            <span>Прайс-лист</span>
                            <img src={Download} />
                        </div>
                    </div>

                    <div className="product__description">
                        <div className="description__title">
                            <span onClick={(e) => setIsShowDescription(!isShowDescription)}>
                                Описание{' '}
                            </span>
                            <img
                                onClick={(e) => setIsShowDescription(!isShowDescription)}
                                className={isShowDescription ? '' : 'rotate'}
                                src={Show}
                            />
                        </div>
                        {isShowDescription && (
                            <div className="description__content">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
                                magnam facere quidem cumque, in velit tenetur ipsa nulla recusandae
                                atque, veritatis quia obcaecati dolorum nisi enim harum ipsum
                                officiis reiciendis.
                            </div>
                        )}
                    </div>

                    <div className="product__separation"></div>

                    <div className="product__characteristics">
                        <div className="characteristics__title">
                            <span onClick={(e) => setIsShowCharacteristics(!isShowCharacteristics)}>
                                Характеристики
                            </span>{' '}
                            <img
                                onClick={(e) => setIsShowCharacteristics(!isShowCharacteristics)}
                                className={isShowCharacteristics ? '' : 'rotate'}
                                src={Show}
                            />
                        </div>
                        {isShowCharacteristics && (
                            <div className="characteristics__content">
                                <div className="content__item">
                                    <span className="item__title">Штрихкод:</span>
                                    {' ' + product?.barcode}
                                </div>
                                <div className="content__item">
                                    <span className="item__title">Производитель:</span>
                                    {' ' + product?.manufacturer}
                                </div>
                                <div className="content__item">
                                    <span className="item__title">Бренд:</span>
                                    {' ' + product?.brand}
                                </div>
                                <div className="content__item">
                                    <span className="item__title">
                                        {product?.sizeType && product?.sizeType.indexOf('л') >= 0
                                            ? 'Объём'
                                            : 'Вес'}
                                        :
                                    </span>
                                    {' ' + product?.size + ' ' + product?.sizeType}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
