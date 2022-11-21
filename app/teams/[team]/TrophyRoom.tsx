'use client'
import Trophy from "./Trophy"
import { useState,useEffect } from "react"
import { leagueUrl } from "../../../utils/src/leagueUrl"
import { trophyType } from "../../../typings"

export default function TrophyRoom({color1,color2,teamId}:{color1:string,color2:string,teamId:string}){
    const [trophies,setTrophies]=useState<trophyType[]>([])
    useEffect(()=>{
        getTrophies()
    },[teamId])
    return (
        <div className="flex flex-row items-start justify-start">
            {trophies.map((trophy:trophyType)=>{
                return(
                    <Trophy key={trophy._id} color1={color1} color2={color2} title={trophy.title}/>
                )
            })}
        </div>
    )
    function getTrophies(){
        fetch(`${leagueUrl}/api/getTeamTrophiesApi`,{
            method:'POST',
            body:JSON.stringify({teamId})
        })
        .then((res)=>{
            const resData= res.json()
            return resData
        })
        .then((data)=>{
            setTrophies(data)
        })
    }
}