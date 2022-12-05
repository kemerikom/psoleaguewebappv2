import {auth} from './config'
import { signOut } from 'firebase/auth'


export async function logoutUser(){
    try{
        signOut(auth)
        return true
    }catch{
        return false
    }

}