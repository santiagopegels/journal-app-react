import { types } from "../../types/types"
import { authReducer } from "../../reducers/authReducer"

describe('Test on authReducer', () => {
    test('should do login', () => {

        const initState = {}

        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'test'
            }
        }

        const state = authReducer(initState, action)

        expect(state).toEqual({
            uid: action.payload.uid,
            name: action.payload.displayName
        })

    })

    test('should do logout', () => {

        const initState = {
            uid: 'abc',
            name: 'test'
        }

        const action = {
            type: types.logout
        }

        const state = authReducer(initState, action)

        expect(state).toEqual({})

    })

})
