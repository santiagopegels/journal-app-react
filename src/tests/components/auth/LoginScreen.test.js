import React from 'react'
import { LoginScreen } from "../../../components/auth/LoginScreen"
import { mount } from "enzyme"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth'

jest.mock('../../../actions/auth', () => {
    return {
        startGoogleLogin: jest.fn(),
        startLoginEmailPassword: jest.fn()
    }
})

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
}

let store = mockStore(initState)
store.dispatch = jest.fn()


const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter >
            <LoginScreen />
        </MemoryRouter>
    </Provider>
)

describe('Test on Login Screen', () => {
    beforeEach(() => {
        store = mockStore(initState)
        jest.clearAllMocks()
    })


    test('should show correctly', () => {

        expect(wrapper).toMatchSnapshot()

    })

    test('should launch startGoogleLogin action', () => {

        wrapper.find('.google-btn').prop('onClick')()

        expect(startGoogleLogin).toHaveBeenCalled()

    })

    test('should launch startLogin with arguments', () => {
        
        wrapper.find('form').prop('onSubmit')(
            {preventDefault(){}}
        )

        expect(startLoginEmailPassword).toHaveBeenLastCalledWith('', '')

    })
    

})
