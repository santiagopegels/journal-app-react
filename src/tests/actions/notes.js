/**
 * @jest-environment node
 */
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes'
import { types } from '../../types/types'
import { db } from '../../firebase/firebase-config'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
    auth: {
        uid: 'Testing',
    }
}

let store = mockStore(initState)

describe('Test on notes actions', () => {

    beforeEach(() => {
        store = mockStore(initState)
    })

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

        await db.doc(`${store.getState().auth.uid}/journal/notes/${docId}`).delete()
    })

    test('startLoadingNotes should load the notes', async () => {

        await store.dispatch(startLoadingNotes(store.getState().auth.uid))
        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        })

        const expectedObject = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        expect(actions[0].payload[0]).toMatchObject(expectedObject)
    })

    test('startSaveNote should update a note', async () => {

        let note = null;
        const doc = await db.collection(`${store.getState().auth.uid}/journal/notes`).limit(1).get()

        doc.forEach(docNote => {
            note = { id: docNote.id, ...docNote.data() }
        });

        note.title = 'Test'

        await store.dispatch(startSaveNote(note))

        const docRef = await db.doc(`${store.getState().auth.uid}/journal/notes/${note.id}`).get()

        expect(docRef.data().title).toBe(note.title)

    })

/*     test('startUploading should update the file url', async () => {
        
        const file = []

        let note = null;
        const doc = await db.collection(`${store.getState().auth.uid}/journal/notes`).limit(1).get()

        doc.forEach(docNote => {
            note = { id: docNote.id, ...docNote.data() }
        });

        const state = {...store.getState(), notes: {active: note}}
        store = mockStore(state)
        
        await store.dispatch(startUploading(file))
    }) */


})
