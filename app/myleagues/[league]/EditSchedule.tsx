'use client'
import {useEffect,useState} from 'react'
import TableScheduleEditable from '../../../components/TableScheduleEditable'
import { matchType } from '../../../typings'


export default function EditSchedule({leagueId}:{leagueId:string}){
    const [matches,setMatches]=useState<matchType[]>([])
    useEffect(()=>{
        if(leagueId!=undefined)getMatches()
    },[leagueId])
    return(
        <div className="flex flex-col p-2 space-y-2 bg-white rounded items-center">
            <h2>Edit Schedule</h2>
            <hr/>
            <div className='flex w-full flex-col'>
                <TableScheduleEditable matches={matches}/>
            </div>    
        </div>
    )
    async function getMatches() {
        fetch(`${process.env.appPath}/api/getLeagueMatchesApi`,{
            method:'POST',
            body:JSON.stringify({leagueId})
        })
        .then((res)=>{
            const resData = res.json()
            return resData
        })
        .then((data)=>{
            setMatches(data)
        })
    }
}