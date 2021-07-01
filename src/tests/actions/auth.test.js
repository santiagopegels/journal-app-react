import { login, logout, startLogout, startLoginEmailPassword } from "../../actions/auth"
import { types } from "../../types/types"
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {}

let store = mockStore(initState)

describe('Test on auth actions', () => {

    beforeEach(() => {
        store = mockStore(initState)
    })

    test('login and logout should execute its actions ', () => {

        const uid = 'Testing'
        const displayName= 'Test'


        const loginAction = login(uid, displayName)
        const logoutAction = logout()

        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        })

        expect(logoutAction).toEqual({
            type: types.logout
        })
    })

    test('should start logout', async () => {
        await store.dispatch(startLogout())

        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: types.logout
        })

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        })

    })

    test('should login with email and password', async () => {

        await store.dispatch(startLoginEmailPassword('test@test.com', '123456'))
        const actions = store.getActions()

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: expect.any(String),
                displayName: null
            }
        })
    })
    
    

})
