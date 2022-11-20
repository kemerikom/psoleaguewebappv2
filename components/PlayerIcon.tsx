'use client'
import { Popover } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { leagueUrl } from "../utils/src/leagueUrl";

export default function PlayerIcon({color1,color2,fontcolor,position,playerid}:{color1:string,color2:string,fontcolor:string,position:string,playerid?:string}){
    const [playerName,setPlayerName]=useState<string>("")
    useEffect(()=>{
        if(playerid) getPlayerName()
    },[playerid])
    return(
        <Popover className={`relative ${!playerid?'animate-pulse':''} items-center justify-center flex h-full outline-none focus:outline-none`}>
            <Popover.Button className="flex h-full aspect-square items-center justify-center rounded-full outline-none focus:outline-none border-4 bg-white"
            style={{backgroundColor:color1,borderColor:color2,color:fontcolor}}
            >
                <div >
                    {position}
                </div>
            </Popover.Button>
            <Popover.Panel className={`absolute flex top-4 h-full left-4 -translate-y-full bg-white p-2 px-4 rounded-full items-center justify-center border-4 transition-all `}
            style={{backgroundColor:color1,borderColor:color2,color:fontcolor}}
            >
                {playerid&&
                    <Link className="flex hover:underline" href='/'>{playerName||""}</Link>
                }
                {!playerid&&
                <label>No Player Assingment</label>
                }
            </Popover.Panel>
        </Popover>
    )
    async function getPlayerName(){
        if(playerid){
            fetch(`${leagueUrl}/api/getUserNameApi`,{
                method:'POST',
                body:JSON.stringify({userId:playerid})
            })
            .then((res)=>{
                const dataRes= res.json()
                return dataRes
            })
            .then((data)=>{
                if(data) setPlayerName(data.username)
            })
        }
    }
}