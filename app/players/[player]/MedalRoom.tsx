'use client'
import {useEffect,useState} from 'react'
import { leagueUrl } from '../../../utils/src/leagueUrl'
import { medalType } from '../../../typings'
import Medal from './Medal'


export default function MedalRoom({userId}:{userId:string}){
    const [medals,setMedals]=useState<medalType[]>([])
    useEffect(()=>{
        getMedals()
    },[userId])
    return(
        <div className="flex flex-row items-start justify-start">
            {medals.map((medal:medalType)=>{
                return(
                    <Medal key={medal._id} color1={medal.color1} color2={medal.color2} title={medal.title}/>
                )
            })}
        </div>
    )
    async function getMedals(){
        fetch(`${leagueUrl}/api/getPlayerMedalsApi`,{
            method:'POST',
            body:JSON.stringify({userId})
        })
        .then((res)=>{
            const resData=res.json()
            return resData
        })
        .then((data)=>{
            setMedals(data)
        })
    }
}