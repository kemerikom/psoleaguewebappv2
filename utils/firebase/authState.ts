import {onAuthStateChanged } from "firebase/auth";
import {auth} from './config'


export default function authState(){
    onAuthStateChanged(auth,(user)=>{
        if(user){
          console.log(user)
        }else{
          console.log(false)
        }
      })
}
