import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppDispatch } from './hooks/redux'
import Cart from './pages/Cart'
import Catalog from './pages/Catalog'
import ProductPage from './pages/ProductPage'
import { fetchCategories, fetchProducts } from './store/reducers/ActionCreators'
import { cartPageURL, catalogPageURL, productionURL } from './constants'
import MainContainer from './components/MainContainer'
import './styles/index.scss'

const baseUrl = process.env.NODE_ENV === 'production' ? productionURL : ''

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
    }, [])

    return (
        <BrowserRouter>
            <MainContainer>
                <Routes>
                    <Route path={`${baseUrl}${catalogPageURL}}`} element={<Catalog />} />
                    <Route path={`${baseUrl}${catalogPageURL}/:id`} element={<ProductPage />} />
                    <Route path={`${baseUrl}${cartPageURL}`} element={<Cart />} />
                    <Route path="*" element={<Catalog />} />
                </Routes>
            </MainContainer>
        </BrowserRouter>
    )
}

export default App
