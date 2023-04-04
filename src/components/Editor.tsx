import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { IProduct } from '../models/IProduct'
import Close from '../../public/images/Close.png'
import Trash from '../../public/images/Trash.png'
import Save from '../../public/images/Save.png'
import { categories, ICategory } from '../types/categories'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { editorSlice } from '../store/reducers/EditorSlice'
import { productSlice } from '../store/reducers/ProductSlice'
import { cartSlice } from '../store/reducers/CartSlice'

const Editor: FC = () => {
    const dispatch = useAppDispatch()
    const { product } = useAppSelector((state) => state.editorReducer)
    const [editableProduct, setEditableProduct] = useState<IProduct>({
        id: new Date().getTime(),
        urlImage: '',
        title: '',
        sizeType: 'г',
        size: '',
        barcode: '',
        manufacturer: '',
        brand: '',
        description: '',
        price: 0,
        categories: [],
        subcategory: '',
    })
    const { changeProduct, addProduct, deleteProductById } = productSlice.actions
    const { deleteItemById } = cartSlice.actions

    const { changeShowing, deleteEditableProduct } = editorSlice.actions
    const allCategories: ICategory[] = categories

    useEffect(() => {
        if (product) {
            setEditableProduct(product)
        }
    }, [product])

    const hideEditor = () => {
        dispatch(changeShowing(false))
    }

    return (
        <div className="editor" onClick={(e) => hideEditor()}>
            <div className="editor__content" onClick={(e) => e.stopPropagation()}>
                <img className="editor__close" src={Close} onClick={() => hideEditor()} />

                <div className="editor__inputs">
                    <div className="inputs__url-image">
                        <span>Url: </span>
                        <input
                            value={editableProduct.urlImage}
                            onChange={(e) =>
                                setEditableProduct({ ...editableProduct, urlImage: e.target.value })
                            }
                        ></input>
                        <div className="url-image__content">
                            <img src={editableProduct.urlImage} />
                        </div>
                    </div>
                    <div className="inputs__size">
                        <span>Размер: </span>
                        <input
                            value={editableProduct?.size}
                            onChange={(e) =>
                                setEditableProduct({ ...editableProduct, size: e.target.value })
                            }
                        ></input>
                        <select
                            onChange={(e) =>
                                setEditableProduct({ ...editableProduct, sizeType: e.target.value })
                            }
                            defaultValue={product?.sizeType.includes('г') ? 'г' : 'мл'}
                        >
                            <option value="г">г</option>
                            <option value="мл">мл</option>
                        </select>
                    </div>
                    <div className="inputs__title">
                        <span>Название: </span>
                        <input
                            value={editableProduct?.title}
                            onChange={(e) =>
                                setEditableProduct({ ...editableProduct, title: e.target.value })
                            }
                        ></input>
                    </div>
                    <div className="inputs__description">
                        <span>Описание: </span>
                        <input
                            value={editableProduct?.description}
                            onChange={(e) =>
                                setEditableProduct({
                                    ...editableProduct,
                                    description: e.target.value,
                                })
                            }
                        ></input>
                    </div>
                    <div className="inputs__barcode">
                        <span>Штрихкод: </span>
                        <input
                            value={editableProduct?.barcode}
                            onChange={(e) =>
                                setEditableProduct({ ...editableProduct, barcode: e.target.value })
                            }
                        ></input>
                    </div>
                    <div className="inputs__manufacturer">
                        <span>Производитель: </span>
                        <input
                            value={editableProduct?.manufacturer}
                            onChange={(e) =>
                                setEditableProduct({
                                    ...editableProduct,
                                    manufacturer: e.target.value,
                                })
                            }
                        ></input>
                    </div>
                    <div className="inputs__brand">
                        <span>Бренд: </span>
                        <input
                            value={editableProduct?.brand}
                            onChange={(e) =>
                                setEditableProduct({ ...editableProduct, brand: e.target.value })
                            }
                        ></input>
                    </div>
                    <div className="inputs__price">
                        <span>Цена: </span>
                        <input
                            value={editableProduct?.price}
                            onChange={(e) =>
                                setEditableProduct({ ...editableProduct, price: +e.target.value })
                            }
                        ></input>
                    </div>
                    <div className="inputs__categories">
                        <div className="categories__title">Категории: </div>
                        {allCategories.map((item, index) => (
                            <div key={index} className="categories__category">
                                <input
                                    checked={editableProduct?.categories.includes(item.category)}
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setEditableProduct({
                                                ...editableProduct,
                                                categories: [
                                                    ...editableProduct.categories,
                                                    item.category,
                                                ],
                                            })
                                        } else {
                                            setEditableProduct({
                                                ...editableProduct,
                                                categories: editableProduct.categories.filter(
                                                    (category) => category !== item.category
                                                ),
                                            })
                                        }
                                    }}
                                ></input>
                                <div className="categories__title">{item.category}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="editor__actions">
                    <div
                        className="actions__save"
                        onClick={(e) => {
                            hideEditor()
                            if (product) {
                                dispatch(changeProduct(editableProduct))
                            } else {
                                dispatch(addProduct(editableProduct))
                            }
                        }}
                    >
                        <img src={Save} />
                    </div>
                    {product && (
                        <div
                            className="actions__delete"
                            onClick={(e) => {
                                hideEditor()
                                dispatch(deleteProductById(editableProduct.id))
                                dispatch(deleteItemById(editableProduct.id))
                                dispatch(deleteEditableProduct())
                            }}
                        >
                            <img src={Trash} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Editor
