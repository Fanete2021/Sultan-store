import React, { FC, useEffect, useState } from 'react'
import Slider from '../../public/images/Slider.png'

interface ListProps<T> {
    items: T[]
    renderItem: (item: T) => React.ReactNode
}

export default function List<T>(props: ListProps<T>) {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pages, setPages] = useState<number[]>([1])
    const maxCountList: number = 15
    const [currentItems, setCurrentItem] = useState<T[]>([])

    useEffect(() => {
        console.log(props.items)
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

    return (
        <div className="list">
            <div className="list__items">{currentItems.map(props.renderItem)}</div>
            <div className="list__slider">
                <img
                    onClick={(e) =>
                        currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1)
                    }
                    src={Slider}
                    className="slider__back"
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
                    onClick={(e) =>
                        pages[pages.length - 1] !== currentPage
                            ? setCurrentPage(currentPage + 1)
                            : setCurrentPage(pages[pages.length - 1])
                    }
                    src={Slider}
                    className="slider__next"
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
