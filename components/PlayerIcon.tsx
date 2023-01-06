'use client'
import { Popover } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { userNameIdType } from "../typings";
import { leagueUrl } from "../utils/src/leagueUrl";

export default function PlayerIcon({color1,color2,fontcolor,position,player}:{color1:string,color2:string,fontcolor:string,position:string,player?:userNameIdType}){
    return(
        <Popover className={`relative ${!player?'animate-pulse':''} items-center justify-center flex h-full outline-none focus:outline-none`}>
            <Popover.Button className="flex h-full aspect-square items-center justify-center rounded-full outline-none focus:outline-none border-4"
            style={{backgroundColor:color1,borderColor:color2,color:fontcolor}}
            >
                <div >
                    {position}
                </div>
            </Popover.Button>
            <Popover.Panel className={`absolute flex top-4 h-full left-4 -translate-y-full p-2 px-4 rounded-full items-center justify-center border-4 transition-all `}
            style={{backgroundColor:color1,borderColor:color2,color:fontcolor}}
            >
                {player?.id&&
                    <Link className="flex hover:underline" href='/'>{player.username||""}</Link>
                }
                {!player?.id&&
                <label>No Player Assingment</label>
                }
            </Popover.Panel>
        </Popover>
    )
}