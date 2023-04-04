import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { useAppDispatch } from './hooks/redux'
import Cart from './pages/Cart'
import Catalog from './pages/Catalog'
import ProductPage from './pages/ProductPage'
import { fetchProducts } from './store/reducers/ActionCreators'
import './styles/index.scss'

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    return (
        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path={`/Sultan-store/catalog`} element={<Catalog />}></Route>
                <Route path={`/Sultan-store/catalog/:id`} element={<ProductPage />}></Route>
                <Route path={`/Sultan-store/cart`} element={<Cart />}></Route>
                <Route path="*" element={<Catalog />}></Route>
            </Routes>
            <Footer></Footer>
        </BrowserRouter>
    )
}

export default App
