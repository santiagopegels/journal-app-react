import {
    setError, 
    removeError,
    startLoading,
    stopLoading
} from "../../actions/ui"
import { types } from "../../types/types"

describe('Test on ui-actions', () => {

    test('all actions should work', () => {
        const action = setError('Error')

        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'Error'
        })
    })

    const removeErrorAction = removeError()
    const startLoadingAction = startLoading()
    const stopLoadingAction = stopLoading()

    expect(removeErrorAction).toEqual({
        type: types.uiRemoveError
    })
    expect(startLoadingAction).toEqual({
        type: types.uiStartLoading
    })
    expect(stopLoadingAction).toEqual({
        type: types.uiStopLoading
    })
})
