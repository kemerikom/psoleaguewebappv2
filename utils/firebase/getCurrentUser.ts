import {auth} from './config'
import { onAuthStateChanged } from 'firebase/auth'

export function getCurrentUser(){
    onAuthStateChanged(auth,(user)=>{
        if(user){
            console.log('user',user)
            return user
        }else{
            console.log('user',false)
            return false
        }
    })
}