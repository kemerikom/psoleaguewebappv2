'use client'
import { matchType } from "../typings";
import {useState,Dispatch} from 'react'
import Link from "next/link";
import {IoSave} from 'react-icons/io5'


export default function TableScheduleEditableRow({match,index,hoverTeam,setHoverTeam}:{match:matchType,index:number,hoverTeam:string,setHoverTeam:Dispatch<string>}){
    let date = new Date(match.datetime)
    let dateString=date.toISOString().substring(0,16)
    return(
        <tr key={index} className='w-full group'>
            <td className={`${(index+1)%2==0?'bg-blue-300':''} border font-normal transition-all border-black whitespace-nowrap`}>{index+1}</td>
            <td 
            onMouseEnter={()=>setHoverTeam(match.hometeamname)}
            onMouseLeave={()=>setHoverTeam("")}
            className={`${hoverTeam==match.hometeamname?'bg-green-600 text-white':(index+1)%2==0?'bg-blue-300':''}  border font-normal transition-all border-black whitespace-nowrap`}>
                <Link href='/' className='font-semibold'>
                    {match.hometeamname}
                </Link>
            </td>
            <td className={`${(index+1)%2==0?'bg-blue-300':''} ${!match.completed?'':match.hometeamscore>match.awayteamscore?'bg-green-100':match.hometeamscore<match.awayteamscore?'bg-red-100':'bg-yellow-100'} border font-normal transition-all border-black whitespace-nowrap`}>
                <input type={'number'} className='bg-transparent max-w-[40px] text-center' placeholder='?' defaultValue={match.hometeamscore}/>
            </td>
            <td className={`${(index+1)%2==0?'bg-blue-300':''} ${!match.completed?'':match.hometeamscore<match.awayteamscore?'bg-green-100':match.hometeamscore>match.awayteamscore?'bg-red-100':'bg-yellow-100'} border font-normal transition-all border-black whitespace-nowrap`}>
                <input type={'number'} className='bg-transparent max-w-[40px] text-center'  placeholder='?' defaultValue={match.awayteamscore}/>
            </td>
            <td 
            onMouseEnter={()=>setHoverTeam(match.awayteamname)}
            onMouseLeave={()=>setHoverTeam("")}
            className={`${hoverTeam==match.awayteamname?'bg-green-600 text-white':(index+1)%2==0?'bg-blue-300':''} border font-normal transition-all border-black whitespace-nowrap`}>
                <Link href='/' className='font-semibold'>
                    {match.awayteamname}
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
            <td className="flex items-center justify-center"> 
                <div className="flex w-8 aspect-square items-center justify-center">
                    <IoSave className="text-2xl text-green-600 cursor-pointer hidden group-hover:flex"/>
                </div>
            </td>
        </tr>
    )
}