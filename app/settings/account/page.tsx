'use client'
import {useEffect,useState} from 'react'
import {auth} from '../../../utils/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import PosInput from '../../../components/PosInput'
import CountryInput from '../../../components/CountryInput'


type posType={
    pos:string
}

type countryType={
    name:string,
    code:string
}


export default function Page(){
    const [uid,setUid]=useState<string|boolean>(false)
    const [mainPos,setMainPos]=useState<posType>({pos:''})
    const [secPos,setSecPos]=useState<posType>({pos:''})
    const [country,setCountry]=useState<countryType>({name:'',code:''})
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUid(user.uid)
            }else{
                setUid(false)
            }
        })
    },[])
    return(
        <div className='flex flex-col space-y-2 items-center justify-center'>
            <h1 className='text-center'>Account Settings</h1>
            <hr/>
            <div className='flex flex-col max-w-lg w-full space-y-2'>
                <PosInput value={mainPos} setValue={setMainPos} placeholder='Main position'/>
                <PosInput value={secPos} setValue={setSecPos} placeholder='Second position'/>
                <CountryInput value={country} setValue={setCountry}/>
                <button className='ml-auto bg-blue-600 text-white py-2 px-4 rounded'>Save</button>
            </div>
        </div>
    )
}