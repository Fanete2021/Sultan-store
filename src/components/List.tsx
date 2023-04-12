import React, { FC, useEffect, useState } from 'react'
import Slider from '../../public/images/Slider.png'
import '../styles/list.scss'

interface ListProps<T> {
    items: T[]
    renderItem: (item: T) => React.ReactNode
}

const maxCountList: number = 15

export default function List<T>(props: ListProps<T>) {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pages, setPages] = useState<number[]>([1])
    const [currentItems, setCurrentItem] = useState<T[]>([])

    useEffect(() => {
        setCurrentItem(
            props.items.slice((currentPage - 1) * maxCountList, currentPage * maxCountList)
        )

        const tempPages: number[] = [1]
        const countPages: number =
            props.items.length % maxCountList === 0
                ? props.items.length / maxCountList
                : props.items.length / maxCountList + 1

        for (let i = 2; i <= countPages; i++) {
            tempPages.push(i)
        }
        setPages(tempPages)
    }, [props.items, currentPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [props.items])

    const backSliderClickHandler = (e: React.MouseEvent<HTMLImageElement>) => {
        pages[pages.length - 1] !== currentPage
            ? setCurrentPage(currentPage + 1)
            : setCurrentPage(pages[pages.length - 1])
    }

    const nextSliderClickHandler = (e: React.MouseEvent<HTMLImageElement>) => {
        currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1)
    }

    return (
        <div className="list">
            <div className="list__items">{currentItems.map(props.renderItem)}</div>
            <div className="list__slider">
                <img
                    onClick={backSliderClickHandler}
                    src={Slider}
                    className="slider__back"
                    alt=""
                />
                <div className="slider__pages">
                    {pages.map((page, index) => (
                        <div
                            key={index}
                            className={
                                currentPage === page ? 'pages__page pages__active' : 'pages__page'
                            }
                            onClick={(e) => setCurrentPage(index + 1)}
                        >
                            {page}
                        </div>
                    ))}
                </div>
                <img
                    onClick={nextSliderClickHandler}
                    src={Slider}
                    className="slider__next"
                    alt=""
                />
            </div>
            <div className="list__description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo,
                vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum
                duis. Faucibus consectetur aliquet sed pellentesque consequat consectetur congue
                mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.
            </div>
        </div>
    )
}
