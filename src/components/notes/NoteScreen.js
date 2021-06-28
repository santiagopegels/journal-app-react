import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { activeNote } from '../../actions/notes'

export const NoteScreen = () => {

    const dispatch = useDispatch()
    const { active: note } = useSelector(state => state.notes)
    const [formValues, handleInputChange, reset] = useForm(note)
  
    const { body, title } = formValues
    const activeId = useRef(note.id)

    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note)
            activeId.current = note.id 
        }
    }, [note, reset])

    useEffect(() => {

        dispatch(activeNote(formValues.id, {...formValues}))

    }, [formValues, dispatch])

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today?"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                >
                </textarea>
                {
                    (note.url) &&
                    <div className="notes__image">
                        <img
                            src="https://www.dzoom.org.es/wp-content/uploads/2017/07/seebensee-2384369-810x540.jpg"
                            alt="note"
                        />
                    </div>
                }
            </div>
        </div>
    )
}
