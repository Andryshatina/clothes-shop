import firebase from "firebase/compat";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
    apiKey: "AIzaSyD6w4M1-22WhxN57WwIz-4agxao175wwrY",
    authDomain: "crwn-db-d59a8.firebaseapp.com",
    projectId: "crwn-db-d59a8",
    storageBucket: "crwn-db-d59a8.appspot.com",
    messagingSenderId: "775810729834",
    appId: "1:775810729834:web:40580748dfceaf8bbd0713",
    measurementId: "G-E6TW757MJN"
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;