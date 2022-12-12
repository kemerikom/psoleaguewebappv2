'use client'
import { useEffect,useState } from "react"
import Link from 'next/link'

type leagueNameType={
    _id:string,
    name:string,
    logo:string
}

export default function LeagueList() {
    const [leagues,setLeagues]=useState<leagueNameType[]>([])
    useEffect(()=>{
        getLeagueNames()
    },[])
    return(
        <div className="flex flex-col flex-shrink-0 p-2 bg-white backdrop-blur-sm bg-opacity-70 rounded space-y-2 w-64">
            <h3 className="font-semibold text-center">Divisions</h3>
            {leagues.map((league)=>{
                return(
                    <Link key={league._id} href={`/myleagues/${league._id}`} className='flex flex-row py-2 px-4 items-center justify-between w-full bg-blue-600 rounded text-white hover:bg-blue-800 transition-all'>
                        <div className="flex items-center justify-center w-8 aspect-square rounded-full">
                            <img src='/teamlogo.png' className="flex object-contain items-center justify-center rounded-full"></img>
                        </div>
                        <h4 className="flex cursor-pointer line-clamp-1">{league.name}</h4>
                    </Link>
                )
            })}
        </div>
    )
    async function getLeagueNames(){
        fetch(`${process.env.appPath}/api/getLeaguesByUidApi`,{
            next:{revalidate:60}
        })
        .then((res)=>{
            const resData = res.json()
            return resData
        })
        .then((data)=>{
            setLeagues(data)
        })
    }
}