import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
import { getStorage } from "firebase/storage";

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

export const db=getFirestore(app)
export const auth=getAuth(app)
export const storage = getStorage(app);