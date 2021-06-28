import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'

export const NoteScreen = () => {

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
    
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    value={title}
                    onchange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today?"
                    className="notes__textarea"
                    value={body}
                    onchange={handleInputChange}
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
