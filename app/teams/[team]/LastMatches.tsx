'use client'
import Link from 'next/link'
import {useState,useEffect} from 'react'
import { matchType } from '../../../typings'
import { leagueUrl } from '../../../utils/src/leagueUrl'
import MatchResult from '../../../components/MatchResult'

export default function LastMatches({teamId}:{teamId:string}){
    const [matches,setMatches]=useState<matchType[]>([])
    useEffect(()=>{
        getMatches()
    },[teamId])
    return(
        <div className='flex flex-col items-center justify-center w-full space-y-2'>
            {matches.map((match)=>{
                return(
                    <MatchResult key={match._id} match={match}/>
                )
            })}
        </div>
    )
    async function getMatches() {
        fetch(`${leagueUrl}/api/getMatchesByTeamIdApi`,{
            method:'POST',
            body:JSON.stringify({teamId})
        })
        .then((res)=>{
            const resData= res.json()
            return resData
        })
        .then((data)=>{
            setMatches(data)
        })
    }
}