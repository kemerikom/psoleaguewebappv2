import {auth} from './config'
import { signInWithEmailAndPassword } from 'firebase/auth'

export async function loginUser({email,password}:{email:string,password:string}){
    try{
        const userCredential= await signInWithEmailAndPassword(auth,email,password)
        return userCredential
    }catch{
        return false
    }

}