import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCJ22FH5qh3GKRCYM1rTweMs22IM3ntSNQ",
    authDomain: "crwn-db-e83ad.firebaseapp.com",
    databaseURL: "https://crwn-db-e83ad.firebaseio.com",
    projectId: "crwn-db-e83ad",
    storageBucket: "crwn-db-e83ad.appspot.com",
    messagingSenderId: "880899911571",
    appId: "1:880899911571:web:94fe31142c44fac7dc8266"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
           await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (e) {
            console.log('An error occurred while creating user', e.message);
        }

        return userRef;

    }
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;