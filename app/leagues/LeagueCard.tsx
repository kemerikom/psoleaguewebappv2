'use client'
import { memo } from "react";
import {leagueName} from '../../typings'
import {useState} from 'react'


type Data={
    data:leagueName
}

export default memo(function LeagueCard({data}:Data){

    return(
        <div className={`flex items-col rounded p-2 cursor-pointer w-64 gap-x-1`}
        style={{background:`linear-gradient(45deg, ${data.color1} 0%, ${data.color2} 100%)`}}
        >
            <div className={`flex items-center justify-center aspect-square w-16 rounded-full `}>
                <img src='/teamlogo.png' className="flex aspect-square w-full object-contain rounded-full"></img>
            </div>
            <div className="flex flex-col flex-1 items-end bg-white backdrop-blur-sm bg-opacity-50 p-1 rounded">
                <h3 className="font-medium whitespace-nowrap">{data.name}</h3>
            </div>
        </div>
    )
})