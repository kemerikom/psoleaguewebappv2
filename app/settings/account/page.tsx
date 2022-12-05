'use client'
import {useEffect,useState} from 'react'
import PosInput from '../../../components/PosInput'
import CountryInput from '../../../components/CountryInput'
import {useContext} from 'react'
import {SiteContext} from '../../../context/SiteContext'
import { playerType } from '../../../typings'
import CountryList from '../../../utils/src/countryList.json'


type posType={
    pos:string
}

type countryType={
    name:string,
    code:string
}


export default function Page(){
    const siteData:any=useContext(SiteContext)
    const {uid}=siteData
    const [user,setUser]=useState<playerType|null>(null)
    const [mainPos,setMainPos]=useState<posType>({pos:''})
    const [secPos,setSecPos]=useState<posType>({pos:''})
    const [country,setCountry]=useState<countryType>({name:'',code:''})
    useEffect(()=>{
        if(uid!=null)getDatas()
    },[uid])
    return(
        <div className='flex flex-col space-y-2 items-center justify-center'>
            <h1 className='text-center'>Account Settings</h1>
            <hr/>
            <div className='flex flex-col max-w-lg w-full space-y-2'>
                <PosInput value={mainPos} setValue={setMainPos} placeholder='Main position'/>
                <PosInput value={secPos} setValue={setSecPos} placeholder='Second position'/>
                <CountryInput value={country} setValue={setCountry} cCode={country.code}/>
                <button onClick={saveDatas} className='ml-auto bg-blue-600 text-white py-2 px-4 rounded'>Save</button>
            </div>
        </div>
    )
    async function getDatas(){
        fetch(`${process.env.appPath}/api/getUserByUidApi`,{
            method:'POST',
            body:JSON.stringify({uid})
        })
        .then((res)=>{
            const resData = res.json()
            return resData
        })
        .then((data:playerType)=>{
            setMainPos({pos:data.mainpos})
            setSecPos({pos:data.secondpos})
            const ct=CountryList.find((ct:countryType)=>ct.code==data.country)
            setCountry({name:ct?.name||'',code:ct?.code||''})
            setUser(data)
        })
    }
    async function saveDatas(){
        const data ={
            uid,
            mainpos:mainPos.pos,
            secondpos:secPos.pos,
            country:country.code
        }
        fetch(`${process.env.appPath}/api/updateAccountApi`,{
            method:'POST',
            body:JSON.stringify(data)
        })
        .then((res)=>{
            const resData=res.json()
            return resData
        })
        .then((data)=>{
            //here devam et
            console.log(data)
        })
    }
}