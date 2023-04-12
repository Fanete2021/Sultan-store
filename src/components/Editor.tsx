import React, { FC, useEffect, useState } from 'react'
import { IProduct } from '../models/IProduct'
import Close from '../../public/images/Close.png'
import Trash from '../../public/images/Trash.png'
import Save from '../../public/images/Save.png'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { editorSlice } from '../store/reducers/slices/EditorSlice'
import { productSlice } from '../store/reducers/slices/ProductSlice'
import { cartSlice } from '../store/reducers/slices/CartSlice'
import '../styles/editor.scss'
import { selectCategories } from '../store/reducers/Selectors'

const initialState: IProduct = {
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
    subcategory: undefined,
}

const Editor: FC = () => {
    const dispatch = useAppDispatch()
    const { product } = useAppSelector((state) => state.editorReducer)
    const [editableProduct, setEditableProduct] = useState<IProduct>(initialState)

    const { categories } = selectCategories()

    const { changeProduct, addProduct, deleteProductById } = productSlice.actions
    const { deleteItemById } = cartSlice.actions

    const { changeShowing, deleteEditableProduct } = editorSlice.actions

    useEffect(() => {
        if (product) {
            setEditableProduct(product)
        }
    }, [product])

    const hideEditor = () => {
        dispatch(changeShowing(false))
    }

    const addCategoryToEditableProduct = (category: number) => {
        setEditableProduct({
            ...editableProduct,
            categories: [...editableProduct.categories, category],
        })
    }

    const deleteCategoryFromEditableProduct = (category: number) => {
        setEditableProduct({
            ...editableProduct,
            categories: editableProduct.categories.filter((item) => item !== category),
        })
    }

    const changeHandlerCategories = (e: React.ChangeEvent<HTMLInputElement>, category: number) => {
        const checked: boolean = e.target.checked

        if (checked) {
            addCategoryToEditableProduct(category)
        } else {
            deleteCategoryFromEditableProduct(category)
        }
    }

    const clickHandlerSave = (e: React.MouseEvent<HTMLDivElement>) => {
        hideEditor()
        if (product) {
            dispatch(changeProduct(editableProduct))
        } else {
            dispatch(addProduct(editableProduct))
        }
    }

    const clickHandlerDelete = (e: React.MouseEvent<HTMLDivElement>) => {
        hideEditor()
        dispatch(deleteProductById(editableProduct.id))
        dispatch(deleteItemById(editableProduct.id))
        dispatch(deleteEditableProduct())
    }

    return (
        <div className="editor" onClick={(e) => hideEditor()}>
            <div className="editor__content" onClick={(e) => e.stopPropagation()}>
                <img className="editor__close" src={Close} onClick={() => hideEditor()} alt="" />

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
                            <img src={editableProduct.urlImage} alt="" />
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
                        {categories.map(({ category, id }, index) => (
                            <div key={index} className="categories__category">
                                <input
                                    checked={editableProduct?.categories.includes(id)}
                                    type="checkbox"
                                    onChange={(e) => changeHandlerCategories(e, id)}
                                ></input>
                                <div className="categories__title">{category}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="editor__actions">
                    <div className="actions__save" onClick={clickHandlerSave}>
                        <img src={Save} alt="" />
                    </div>
                    {product && (
                        <div className="actions__delete" onClick={clickHandlerDelete}>
                            <img src={Trash} alt="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Editor
