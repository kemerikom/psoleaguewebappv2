'use client'
import { useEffect,useState } from "react"
import { leagueUrl } from "../../../utils/src/leagueUrl"
import { playerNamesType } from "../../../typings"
import Link from "next/link"

export default function PlayerList({teamId}:{teamId:string}){
    const [players,setPlayers]=useState<playerNamesType[]>([])
    useEffect(()=>{
        getPlayerNames()
    },[teamId])
    return(
        <div className="flex flex-col items-center w-full">
            {players?.map((player)=>{
                return(
                    <Link className="hover:underline transition-all" key={player._id} href={`/players/${player._id}`}>
                        {player.username}
                    </Link>
                )
            })}
        </div>
    )
    function getPlayerNames() {
        fetch(`${leagueUrl}/api/getPlayerNamesApi`,{
            method:'POST',
            body:JSON.stringify({teamId})
        })
        .then((res)=>{
            const resData=res.json()
            return resData
        })
        .then((data)=>{
            setPlayers(data)
        })
    }
}