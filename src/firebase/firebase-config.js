import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDUS9ql10cYYS3e3o6G75HFGPZaw66qK4g",
    authDomain: "journal-react-example.firebaseapp.com",
    projectId: "journal-react-example",
    storageBucket: "journal-react-example.appspot.com",
    messagingSenderId: "898529882843",
    appId: "1:898529882843:web:abde72df858ff2db3cd2fe"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
     db,
     googleAuthProvider,
     firebase
}