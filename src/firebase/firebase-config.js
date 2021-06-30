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

const firebaseConfigTesting = {
    apiKey: "AIzaSyC0hPASIueL9jpN_1FaL6v52qr2-oppgq0",
    authDomain: "testing-47aa0.firebaseapp.com",
    projectId: "testing-47aa0",
    storageBucket: "testing-47aa0.appspot.com",
    messagingSenderId: "153805280086",
    appId: "1:153805280086:web:0f63ca47efb3e67b273cf7"
  };


  if(process.env.NODE_ENV === 'test'){
    firebase.initializeApp(firebaseConfigTesting);
  } else{
    firebase.initializeApp(firebaseConfig);
  }

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
     db,
     googleAuthProvider,
     firebase
}