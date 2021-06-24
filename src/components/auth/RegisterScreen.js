import React from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { startRegisterForm } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useForm({
        name: 'Santiago',
        email: 'test@test.com',
        password: '123123',
        password2: '123123'
    })

    const { name, email, password, password2 } = formValues

    const handleRegister = (e) => {
        e.preventDefault()

        if (isFormValid()) {
            dispatch(startRegisterForm(email, password, name))

        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Name Required'))
            return false
        }

        if (!validator.isEmail(email)) {
            dispatch(setError('Email is not valid'))
            return false
        }

        if (password !== password2 || password.length < 5) {
            dispatch(setError('Password should at least 6 characters and match'))
            return false
        }

        dispatch(removeError())
        return true
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>

                {
                    msgError && (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                }
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                >
                    Register
                </button>

                <Link
                    to="/auth/login"
                    className="link mt-1"
                >
                    Already registered?
                </Link>
            </form>
        </>
    )
}
