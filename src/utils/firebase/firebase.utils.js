// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8fhQDAufiQDQ8bpSIptyuRQaBaoGl-Q0",
  authDomain: "crwb-db-74630.firebaseapp.com",
  projectId: "crwb-db-74630",
  storageBucket: "crwb-db-74630.appspot.com",
  messagingSenderId: "243746796941",
  appId: "1:243746796941:web:b4b76ec10c74a7d06839c4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const creatUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch(error) {
            console.log('error creating the user', error.message); 
        }
    }

    return userDocRef;

}
