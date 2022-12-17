'use client'
import { matchType, userNameIdType } from "../typings";
import {useState,Dispatch, useEffect} from 'react'
import Link from "next/link";
import {IoSave} from 'react-icons/io5'


export default function TableScheduleEditableRow({match,index,hoverTeam,setHoverTeam,refrees,leagueId}:{match:matchType,index:number,hoverTeam:string,setHoverTeam:Dispatch<string>,refrees:userNameIdType[],leagueId:string}){
    let date = new Date(match.datetime)
    let dateString=date.toISOString().substring(0,16)
    const [homeTeamName,setHomeTeamName]=useState<string>(match.hometeamname)
    const [awayTeamName,setAwayTeamName]=useState<string>(match.awayteamname)
    const [refreeName,setRefreeName]=useState<string|null>(match.refreename)
    const [refreeId,setRefreeId]=useState<string|null>(match.refreeid)
    const [dateTime,setDateTime]=useState<any>(match.datetime)
    const [changed,setChanged]=useState<boolean>(false)
    useEffect(()=>{
        if(dateTime!=match.datetime||refreeId!=match.refreeid)setChanged(true)
    },[refreeId,dateTime])
    return(
        <tr key={index} className='w-full group'>
            <td className={`${(index+1)%2==0?'bg-blue-300':''} border font-normal transition-all border-black whitespace-nowrap`}>{index+1}</td>
            <td 
            onMouseEnter={()=>setHoverTeam(homeTeamName)}
            onMouseLeave={()=>setHoverTeam("")}
            className={`${hoverTeam==homeTeamName?'bg-green-600 text-white':(index+1)%2==0?'bg-blue-300':''}  border font-normal transition-all border-black whitespace-nowrap`}>
                <Link href='/' className='font-semibold'>
                    {homeTeamName}
                </Link>
            </td>
            <td className={`${(index+1)%2==0?'bg-blue-300':''} ${!match.completed?'':match.hometeamscore>match.awayteamscore?'bg-green-100':match.hometeamscore<match.awayteamscore?'bg-red-100':'bg-yellow-100'} border font-normal transition-all border-black whitespace-nowrap`}>
                <label className='bg-transparent max-w-[40px] text-center' >{match.hometeamscore}</label>
            </td>
            <td className={`${(index+1)%2==0?'bg-blue-300':''} ${!match.completed?'':match.hometeamscore<match.awayteamscore?'bg-green-100':match.hometeamscore>match.awayteamscore?'bg-red-100':'bg-yellow-100'} border font-normal transition-all border-black whitespace-nowrap`}>
                <label className='bg-transparent max-w-[40px] text-center' >{match.awayteamscore}</label>
            </td>
            <td 
            onMouseEnter={()=>setHoverTeam(awayTeamName)}
            onMouseLeave={()=>setHoverTeam("")}
            className={`${hoverTeam==awayTeamName?'bg-green-600 text-white':(index+1)%2==0?'bg-blue-300':''} border font-normal transition-all border-black whitespace-nowrap`}>
                <Link href='/' className='font-semibold'>
                    {awayTeamName}
                </Link>
            </td>
            <td className={`${(index+1)%2==0?'bg-blue-300':''} border font-normal text-center transition-all border-black whitespace-nowrap`}>
                <input type={'datetime-local'} className='bg-transparent' defaultValue={dateString} onChange={((e)=>{dateTimeEpox({inputDateTime:e.target.value})})}/>
            </td>
            <td className={`${(index+1)%2==0?'bg-blue-300':''} border font-normal text-center transition-all border-black whitespace-nowrap`}>
                <select className="bg-transparent space-y-2" defaultValue={refreeId||'X'} onChange={((e)=>{sRefreeName(e.target.value)})} >
                    <option value={'X'}>Choose a refree</option>
                    {refrees.map((refree)=>{
                        return(
                            <option key={refree.id} value={refree.id}>{refree.username}</option>
                        )
                    })}
                </select>
            </td>
            <td className="flex items-center justify-center"> 
                <div className="flex w-8 aspect-square items-center justify-center">
                    <IoSave className={`${changed?'flex':' hidden'} text-2xl text-green-600 cursor-pointer`} onClick={updateMatch}/>
                </div>
            </td>
        </tr>
    )
    function dateTimeEpox({inputDateTime}:{inputDateTime:any}){
        const newDate= new Date(inputDateTime).getTime()
        setDateTime(newDate)
    }
    function sRefreeName(e:string){
        if(e!='X'){
            setRefreeId(e)
            let rnmf=refrees.filter((refree)=>refree.id==e)
            setRefreeName(rnmf[0].username||null)
        }else{
            setRefreeId(null)
            setRefreeName(null)
        }
    }
    async function updateMatch() {
        fetch(`${process.env.appPath}/api/updateMatchApi`,{
            method:'POST',
            body:JSON.stringify({
                leagueId,
                matchId:match._id.toString(),
                refreeId:refreeId,
                refreeName:refreeName,
                dateTime
            })
        })
        .then((res)=>{
            const resData=res.json()
            return resData
        })
        .then((data)=>{
            if(data.modifiedCount>0){
                setChanged(false)
            }
        })
    }
}