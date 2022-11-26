import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from './config'

export async function createUser({email,password}:{email:string,password:string}) {
    try {
        const userCredentials= await createUserWithEmailAndPassword(auth,email,password)
        return userCredentials
    } catch (error) {
        return false
    }

}