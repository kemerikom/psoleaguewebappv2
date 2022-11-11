'use client'
import {useState,use} from 'react'
import { leagueName } from "../../typings"
import LeagueCard from './LeagueCard'
import {leagueUrl} from '../../utils/src/leagueUrl'

async function getLeagueNames() {
    try {
        const res= await fetch(`${leagueUrl}/api/getLeagueNamesApi`,{
            method:'POST',
            next:{revalidate:60}
        })
        const leagueNames= await res.json()
        return leagueNames
    } catch (error) {
        return false
    }

}

const ln=getLeagueNames()

export default function LeagueList(){
    const leagueNames=use(ln)
    return(
        <div className='flex flex-col p-2 mx-2 rounded bg-white gap-y-2 overflow-y-auto'>
            <h2 className='text-center font-medium'>Official Leagues</h2>
            <hr/>
            {leagueNames&&leagueNames.filter((filtered:leagueName)=>filtered.official).map((league:leagueName)=>{
                return(
                    <LeagueCard key={league._id} data={league} />
                )
            })}
            <hr/>
            <h2 className='text-center font-medium'>Unofficial Leagues</h2>
            <hr/>
            {leagueNames&&leagueNames.filter((filtered:leagueName)=>!filtered.official).map((league:leagueName)=>{
                return(
                    <LeagueCard key={league._id} data={league} />
                )
            })}
        </div>
    )
}


