'use client'
import Link from "next/link"
import { matchType } from "../typings"
import {useState} from 'react'
import {IoCloudUpload} from 'react-icons/io5'

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
                    let date = new Date(s.datetime)
                    let dateString=date.toISOString().substring(0,16)
                    return(
                        <tr key={index} className='w-full group'>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} border font-normal transition-all border-black whitespace-nowrap`}>{index+1}</td>
                            <td 
                            onMouseEnter={()=>setHoverTeam(s.hometeamname)}
                            onMouseLeave={()=>setHoverTeam("")}
                            className={`${hoverTeam==s.hometeamname?'bg-green-600 text-white':(index+1)%2==0?'bg-blue-300':''}  border font-normal transition-all border-black whitespace-nowrap`}>
                                <Link href='/' className='font-semibold'>
                                    {s.hometeamname}
                                </Link>
                            </td>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} ${!s.completed?'':s.hometeamscore>s.awayteamscore?'bg-green-100':s.hometeamscore<s.awayteamscore?'bg-red-100':'bg-yellow-100'} border font-normal transition-all border-black whitespace-nowrap`}>
                                <input type={'number'} className='bg-transparent max-w-[40px] text-center' placeholder='?' defaultValue={s.hometeamscore}/>
                            </td>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} ${!s.completed?'':s.hometeamscore<s.awayteamscore?'bg-green-100':s.hometeamscore>s.awayteamscore?'bg-red-100':'bg-yellow-100'} border font-normal transition-all border-black whitespace-nowrap`}>
                                <input type={'number'} className='bg-transparent max-w-[40px] text-center'  placeholder='?' defaultValue={s.awayteamscore}/>
                            </td>
                            <td 
                            onMouseEnter={()=>setHoverTeam(s.awayteamname)}
                            onMouseLeave={()=>setHoverTeam("")}
                            className={`${hoverTeam==s.awayteamname?'bg-green-600 text-white':(index+1)%2==0?'bg-blue-300':''} border font-normal transition-all border-black whitespace-nowrap`}>
                                <Link href='/' className='font-semibold'>
                                    {s.awayteamname}
                                </Link>
                            </td>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} border font-normal text-center transition-all border-black whitespace-nowrap`}>
                                <input type={'datetime-local'} className='bg-transparent' defaultValue={dateString}/>
                            </td>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} border font-normal text-center transition-all border-black whitespace-nowrap`}>
                                <select className="bg-transparent">
                                    <option>Choose a refree</option>
                                </select>
                            </td>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} border font-normal text-center transition-all border-black whitespace-nowrap p-2`}>
                                <IoCloudUpload className="text-xl text-green-600"/>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}