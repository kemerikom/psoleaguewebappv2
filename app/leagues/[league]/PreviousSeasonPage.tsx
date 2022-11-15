'use client'
import {useEffect, useState} from 'react'
import { leagueUrl } from '../../../utils/src/leagueUrl'
import { seasonTableType,tableTeamType,tablePointsType,tableScheduleType,tableTopGoalsType,tableTopAssistsType,tableTopSavesType } from '../../../typings'
import { Tab } from '@headlessui/react'
import TableTopPlayers from './TableTopPlayers'
import TablePoints from './TablePoints'
import TableSchedule from './TableSchedule'


export default function PreviousSeasonPage({seasonId}:{seasonId:string}){
    useEffect(()=>{
        if(seasonTable.length==0) getTableData()
    },[])
    const [seasonTable,setSeasonTable]=useState([])
    const [teamNames,setTeamNames]=useState([])
    const [points,setPoinst]=useState<tablePointsType[]>([])
    const [schedule,setSchedule]=useState<tableScheduleType[]>([])
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
                        <TablePoints points={points}></TablePoints>
                    </Tab.Panel>
                    <Tab.Panel as='div' className={'flex flex-col rounded p-2'}>
                        <TableSchedule schedule={schedule}></TableSchedule>
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