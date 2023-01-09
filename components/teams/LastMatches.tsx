import Link from 'next/link'
import {useState,useEffect} from 'react'
import {matchType} from '../../typings'
import MatchResult from '../MatchResult'


export default function LastMatches({matches}:{matches:matchType[]}){

    return(
        <div className='flex flex-col items-center justify-center w-full space-y-2'>
            {matches.map((match)=>{
                return(
                    <MatchResult key={match._id} match={match}/>
                )
            })}
        </div>
    )

}