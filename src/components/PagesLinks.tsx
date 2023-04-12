import React, { FC, PropsWithChildren } from 'react'
import '../styles/pagesLinks.scss'

const MainContainer: FC<PropsWithChildren> = ({ children }) => {
    return <div className="pages">{children}</div>
}

export default MainContainer
