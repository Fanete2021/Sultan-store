import React, { FC, PropsWithChildren } from 'react'
import Header from './Header'
import Footer from './Footer'

const MainContainer: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Header></Header>
            {children}
            <Footer></Footer>
        </>
    )
}

export default MainContainer
