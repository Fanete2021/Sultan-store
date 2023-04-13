/* eslint-disable testing-library/render-result-naming-convention */
const React = require('react')
const Editor = require('../Editor').default
const { selectCategories, selectEditor } = require('../../store/reducers/Selectors')
const { productState } = require('./states')
const { render, screen, fireEvent } = require('@testing-library/react')
const { cartSlice } = require('../../store/reducers/slices/CartSlice')
const { editorSlice } = require('../../store/reducers/slices/EditorSlice')
const { productSlice } = require('../../store/reducers/slices/ProductSlice')
const reduxHooks = require('react-redux')
const { BrowserRouter } = require('react-router-dom')

jest.mock('../../store/reducers/Selectors')
jest.mock('react-redux')

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch')

describe('editor', () => {
    it('should create Editor', () => {
        selectCategories.mockReturnValue({ categories: [] })
        selectEditor.mockReturnValue({ product: null })

        const editor = render(<Editor />)

        expect(editor).toMatchSnapshot()
    })

    it('should create Editor with products', () => {
        selectCategories.mockReturnValue({ categories: [] })
        selectEditor.mockReturnValue({ product: productState })

        const editor = render(<Editor />)

        expect(editor).toMatchSnapshot()
    })

    it('should dispatch actions', () => {
        const dispatch = jest.fn()
        mockedDispatch.mockReturnValue(dispatch)

        selectCategories.mockReturnValue({ categories: [] })
        selectEditor.mockReturnValue({ product: productState })

        const mockedHideEditorComplete = jest.spyOn(editorSlice.actions, 'changeShowing')

        const mockedChangeProductComplete = jest.spyOn(productSlice.actions, 'changeProduct')

        const mockedDeleteProductComplete = jest.spyOn(productSlice.actions, 'deleteProductById')
        const mockedDeleteItemFromCartComplete = jest.spyOn(cartSlice.actions, 'deleteItemById')
        const mockedDeleteProductFromEditorComplete = jest.spyOn(
            editorSlice.actions,
            'deleteEditableProduct'
        )

        render(
            <BrowserRouter>
                <Editor />
            </BrowserRouter>
        )

        fireEvent.click(screen.getByTestId('save'))
        fireEvent.click(screen.getByTestId('trash'))

        expect(dispatch).toHaveBeenCalledTimes(6)

        expect(mockedHideEditorComplete).toHaveBeenCalledWith(false)
        expect(mockedChangeProductComplete).toHaveBeenCalledWith(productState)

        expect(mockedHideEditorComplete).toHaveBeenCalledWith(false)
        expect(mockedDeleteProductComplete).toHaveBeenCalledWith(productState.id)
        expect(mockedDeleteItemFromCartComplete).toHaveBeenCalledWith(productState.id)
        expect(mockedDeleteProductFromEditorComplete).toHaveBeenCalledWith()
    })
})
