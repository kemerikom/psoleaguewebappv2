'use client'
import {useEffect, useState} from 'react'
import { leagueUrl } from '../../../utils/src/leagueUrl'
import { seasonTableType,tableTeamType,tablePointsType,tableScheduleType,tableTopGoalsType,tableTopAssistsType,tableTopSavesType } from '../../../typings'
import Link from 'next/link'
import { Tab } from '@headlessui/react'
import TableTopPlayers from './TableTopPlayers'


export default function PreviousSeasonPage({seasonId}:{seasonId:string}){
    useEffect(()=>{
        if(seasonTable.length==0) getTableData()
    },[])
    const [seasonTable,setSeasonTable]=useState([])
    const [teamNames,setTeamNames]=useState([])
    const [points,setPoinst]=useState<tablePointsType[]>([])
    const [schedule,setSchedule]=useState<tableScheduleType[]>([])
    const [hoverTeam,setHoverTeam]=useState<string>("")
    const [topGoals,setTopGoals]=useState<tableTopGoalsType[]>([])
    const [topAssists,setTopAssists]=useState<tableTopAssistsType[]>([])
    const [topSaves,setTopSaves]=useState<tableTopSavesType[]>([])
    return(
        <div className='flex flex-col space-y-2 items-center justify-center w-full p-2'>
            <Tab.Group as={'div'} className='flex flex-col space-y-2 w-full' defaultIndex={0}>
                <Tab.List as={'div'} className='flex flex-row bg-white p-1 rounded space-x-2 items-center justify-center'>
                    <Tab as='div' className={'outline-none'}>
                        {({selected})=>(
                            <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} transition-all p-2 rounded`}>Table</button>
                        )}
                    </Tab>
                    <Tab as='div' className={'outline-none'}>
                        {({selected})=>(
                            <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} transition-all p-2 rounded`}>Schedule</button>
                        )}
                    </Tab>
                    <Tab as='div' className={'outline-none'}>
                        {({selected})=>(
                            <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} transition-all p-2 rounded`}>Top Players</button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel as='div' className={'flex flex-col rounded p-2'}>
                        <table className='flex flex-col w-full table-fixed cursor-default items-center text-center'>
                            <tbody>
                                <tr className='w-full'>
                                    <th className='border border-black whitespace-nowrap'>#</th>
                                    <th className='border bg-blue-300 border-black whitespace-nowrap'>Team Name</th>
                                    <th className='border border-black whitespace-nowrap'>Point</th>
                                    <th className='border bg-blue-300 border-black whitespace-nowrap'>Win</th>
                                    <th className='border border-black whitespace-nowrap'>Draw</th>
                                    <th className='border bg-blue-300 border-black whitespace-nowrap'>Lose</th>
                                    <th className='border border-black whitespace-nowrap'>Goals</th>
                                    <th className='border bg-blue-300 border-black whitespace-nowrap'>Against</th>
                                    <th className='border border-black whitespace-nowrap'>Diff.</th>
                                </tr>
                                {points?.sort((a,b)=>b.point-a.point||b.diff-a.diff).map((point:tablePointsType,index)=>{
                                return(
                                    <tr key={point.teamname} className='w-full group'>
                                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all border-black whitespace-nowrap font-normal items-center justify-center text-center'>{index+1}</td>
                                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all bg-blue-300 border-black whitespace-nowrap font-normal items-center justify-center text-center'>
                                            <Link href='/' className='hover:font-semibold'>{point.teamname}</Link>
                                        </td>
                                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all border-black whitespace-nowrap font-normal items-center justify-center text-center'>{point.point}</td>
                                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all bg-blue-300 border-black whitespace-nowrap font-normal items-center justify-center text-center'>{point.win}</td>
                                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all border-black whitespace-nowrap font-normal items-center justify-center text-center'>{point.draw}</td>
                                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all bg-blue-300 border-black whitespace-nowrap font-normal items-center justify-center text-center'>{point.lose}</td>
                                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all border-black whitespace-nowrap font-normal items-center justify-center text-center'>{point.goals}</td>
                                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all bg-blue-300 border-black whitespace-nowrap font-normal items-center justify-center text-center'>{point.agoals}</td>
                                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all border-black whitespace-nowrap font-normal items-center justify-center text-center'>{point.diff}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </Tab.Panel>
                    <Tab.Panel as='div' className={'flex flex-col rounded p-2'}>
                        <table className='flex flex-col w-full table-fixed cursor-default items-center text-center'>
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
                                            className={`${(index+1)%2==0?'bg-blue-300':''} ${hoverTeam==s.hometeam?'bg-green-600 text-white':''} border font-normal transition-all border-black whitespace-nowrap`}>
                                                <Link href='/' className='font-semibold'>
                                                    {s.hometeam}
                                                </Link>
                                            </td>
                                            <td className={`${(index+1)%2==0?'bg-blue-300':''} ${!s.completed?'':s.homescore>s.awayscore?'bg-green-100':s.homescore<s.awayscore?'bg-red-100':'bg-yellow-100'} border font-normal transition-all border-black whitespace-nowrap`}>{s.completed?`${s.homescore}`:`?`}</td>
                                            <td className={`${(index+1)%2==0?'bg-blue-300':''} ${!s.completed?'':s.homescore<s.awayscore?'bg-green-100':s.homescore>s.awayscore?'bg-red-100':'bg-yellow-100'} border font-normal transition-all border-black whitespace-nowrap`}>{s.completed?`${s.awayscore}`:`?`}</td>
                                            <td
                                            onMouseEnter={()=>setHoverTeam(s.awayteam)}
                                            onMouseLeave={()=>setHoverTeam("")}
                                            className={`${(index+1)%2==0?'bg-blue-300':''} ${hoverTeam==s.awayteam?'bg-green-600 text-white':''} border font-normal transition-all border-black whitespace-nowrap`}>
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
                    </Tab.Panel>
                    <Tab.Panel as='div' className={'flex flex-col items-center w-full rounded p-2 space-y-1'}>
                        <h3>Top Goals</h3>
                        <hr/>
                        <TableTopPlayers dataGoals={topGoals}></TableTopPlayers>
                        <hr/>
                        <h3>Top Assists</h3>
                        <hr/>
                        <TableTopPlayers dataAssists={topAssists}></TableTopPlayers>
                        <hr/>
                        <h3>Top Assists</h3>
                        <hr/>
                        <TableTopPlayers dataSaves={topSaves}></TableTopPlayers>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
    async function getTableData() {
        fetch(`${leagueUrl}/api/getTableApi`,{
            method:'POST',
            body:JSON.stringify({seasonId})
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            setSeasonTable(data)
            setTeamNames(data.teams)
            setPoinst(data.points)
            setSchedule(data.schedule)
            setTopGoals(data.topplayers.topgoals)
            setTopAssists(data.topplayers.topassists)
            setTopSaves(data.topplayers.topsaves)
        })
    }
}