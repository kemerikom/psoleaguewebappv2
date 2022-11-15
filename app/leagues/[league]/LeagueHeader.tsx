'use client'
import Link from "next/link"
import {IoCloseCircleOutline}from'react-icons/io5'

type PageProps={
    name:string,
    logo:string
}

export default function LeagueHeader({name,logo}:PageProps){
    return(
        <div className="flex flex-row p-2 items-center justify-between space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full" >
                <img className="rounded-full object-contain" src='/teamlogo.png'></img>
            </div>
            <h1>{name}</h1>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600">
                <Link href='/leagues'>
                    <IoCloseCircleOutline className="text-white text-2xl"></IoCloseCircleOutline>
                </Link>
            </div>
        </div>
    )
}