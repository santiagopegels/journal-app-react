import { types } from "../types/types"
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { startLoading, stopLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading())

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                dispatch(login(user.uid, user.displayName))
                dispatch(stopLoading())
            })
            .catch(e => {
                console.log(e);
                dispatch(stopLoading())
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
            })
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startRegisterForm = (email, password, name) => {
    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name })
                dispatch(login(user.uid, user.displayName))
            })
            .catch(e => {
                console.log(e);
            })
    }
}