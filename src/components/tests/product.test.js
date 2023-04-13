/* eslint-disable testing-library/render-result-naming-convention */
const React = require('react')
const { render, screen, fireEvent } = require('@testing-library/react')
const Product = require('../Product').default
const { BrowserRouter } = require('react-router-dom')
const reduxHooks = require('react-redux')
const { cartSlice } = require('../../store/reducers/slices/CartSlice')
const { editorSlice } = require('../../store/reducers/slices/EditorSlice')
const { productState } = require('./states')

jest.mock('react-redux')

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch')

describe('editor', () => {
    it('should create Product', () => {
        mockedDispatch.mockResolvedValue(jest.fn())

        const element = render(
            <BrowserRouter>
                <Product product={productState} />
            </BrowserRouter>
        )

        expect(element).toMatchSnapshot()
    })

    it('should dispatch actions', () => {
        const dispatch = jest.fn()
        mockedDispatch.mockReturnValue(dispatch)

        const mockedAddComplete = jest.spyOn(cartSlice.actions, 'addItem')

        const mockedSetEditableProductComplete = jest.spyOn(
            editorSlice.actions,
            'setEditableProduct'
        )
        const mockedChangeShowingEditorComplete = jest.spyOn(editorSlice.actions, 'changeShowing')

        render(
            <BrowserRouter>
                <Product product={productState} />
            </BrowserRouter>
        )

        fireEvent.click(screen.getByTestId('cart'))
        fireEvent.click(screen.getByTestId('editor'))

        expect(dispatch).toHaveBeenCalledTimes(3)

        const cartItem = {
            product: productState,
            count: 1,
        }

        expect(mockedAddComplete).toHaveBeenCalledWith(cartItem)
        expect(mockedSetEditableProductComplete).toHaveBeenCalledWith(productState)
        expect(mockedChangeShowingEditorComplete).toHaveBeenCalledWith(true)
    })
})
