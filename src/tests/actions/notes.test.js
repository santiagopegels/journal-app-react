import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk' 
import { startNewNote } from '../../actions/notes'
import { types } from '../../types/types'
import { db } from '../../firebase/firebase-config'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const store = mockStore({
    auth: {
        uid: 'Testing',
    }
})

describe('Test on notes actions', () => {
    
    test('should create a new note', async () => {
       
        await store.dispatch(startNewNote())
        
        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        expect(actions[1]).toEqual({
            type: types.notesNewEntry,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        //Delete from database
        const docId = actions[0].payload.id
        console.log(store.getState().auth.uid);
        
        await db.doc(`${store.getState().auth.uid}/journal/notes/${docId}`).delete()
    })

})
