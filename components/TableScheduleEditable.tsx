'use client'
import Link from "next/link"
import { tableScheduleType } from "../typings"
import {useState} from 'react'


export default function TableScheduleEditable({schedule}:{schedule:tableScheduleType[]}){
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
                </tr>
                {schedule?.sort((a,b)=>a.datetime-b.datetime).map((s:tableScheduleType,index)=>{
                    let date = new Date(s.datetime).toLocaleString()
                    return(
                        <tr key={index} className='w-full group'>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} border font-normal transition-all border-black whitespace-nowrap`}>{index+1}</td>
                            <td 
                            onMouseEnter={()=>setHoverTeam(s.hometeam)}
                            onMouseLeave={()=>setHoverTeam("")}
                            //here my team olduğunda bg-blue-600 yapmayı unutma
                            className={`${hoverTeam==s.hometeam?'bg-green-600 text-white':(index+1)%2==0?'bg-blue-300':''}  border font-normal transition-all border-black whitespace-nowrap`}>
                                <Link href='/' className='font-semibold'>
                                    {s.hometeam}
                                </Link>
                            </td>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} ${!s.completed?'':s.homescore>s.awayscore?'bg-green-100':s.homescore<s.awayscore?'bg-red-100':'bg-yellow-100'} border font-normal transition-all border-black whitespace-nowrap`}>{s.completed?`${s.homescore}`:`?`}</td>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} ${!s.completed?'':s.homescore<s.awayscore?'bg-green-100':s.homescore>s.awayscore?'bg-red-100':'bg-yellow-100'} border font-normal transition-all border-black whitespace-nowrap`}>{s.completed?`${s.awayscore}`:`?`}</td>
                            <td 
                            onMouseEnter={()=>setHoverTeam(s.awayteam)}
                            onMouseLeave={()=>setHoverTeam("")}
                            //here my team olduğunda bg-blue-600 yapmayı unutma
                            className={`${hoverTeam==s.awayteam?'bg-green-600 text-white':(index+1)%2==0?'bg-blue-300':''} border font-normal transition-all border-black whitespace-nowrap`}>
                                <Link href='/' className='font-semibold'>
                                    {s.awayteam}
                                </Link>
                            </td>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} border font-normal text-center transition-all border-black whitespace-nowrap`}>{date}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}