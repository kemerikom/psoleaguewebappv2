import { createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig={
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
}


const app = initializeApp(firebaseConfig);

const auth=getAuth(app)

export async function createUser({email,password}:{email:string,password:string}) {
    try {
        const userCredentials= await createUserWithEmailAndPassword(auth,email,password)
        return userCredentials
    } catch (error) {
        return false
    }

}