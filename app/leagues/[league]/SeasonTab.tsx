'use client'
import { Tab } from '@headlessui/react'
import { seasonTableType,tableTeamType,tablePointsType,tableScheduleType,tableTopGoalsType,tableTopAssistsType,tableTopSavesType } from '../../../typings'
import TablePoints from './TablePoints'
import TableSchedule from './TableSchedule'
import TableTopPlayers from './TableTopPlayers'

export default function SeasonTab({points,schedule,topGoals,topAssists,topSaves}:{points:tablePointsType[],schedule:tableScheduleType[],topGoals:tableTopGoalsType[],topAssists:tableTopAssistsType[],topSaves:tableTopSavesType[]}){
    return(
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
    )
}