'use client'
import { matchType } from "../typings"
import {useState} from 'react'
import TableScheduleEditableRow from "./TableScheduleEditableRow"

export default function TableScheduleEditable({matches}:{matches:matchType[]}){
    const [hoverTeam,setHoverTeam]=useState<string>("")
    return(
        <table className='min-w-full table-fixed cursor-default items-center text-center'>
            <tbody>
                <tr>
                    <th className='border border-black whitespace-nowrap'>#</th>
                    <th className='border border-black whitespace-nowrap'>Home Team</th>
                    <th className='border border-black whitespace-nowrap'>Score</th>
                    <th className='border border-black whitespace-nowrap'>Score</th>
                    <th className='border border-black whitespace-nowrap'>Away Team</th>
                    <th className='border border-black whitespace-nowrap'>Date-Time</th>
                    <th className='border border-black whitespace-nowrap'>Refree</th>
                    <th></th>
                </tr>
                {matches?.sort((a,b)=>a.datetime-b.datetime).map((s:matchType,index)=>{
                    return(
                        <TableScheduleEditableRow key={s._id} match={s} index={index} hoverTeam={hoverTeam} setHoverTeam={setHoverTeam}/>
                    )
                })}
            </tbody>
        </table>
    )
}