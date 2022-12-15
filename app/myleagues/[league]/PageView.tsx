'use client'
import { leagueName } from "../../../typings"
import { Tab } from '@headlessui/react'
import CreateSchedule from "./CreateSchedule"

export default function PageView({leagueId}:{leagueId:string}){
    return(
        <div className="flex flex-col">
            <Tab.Group as={'div'} className='flex flex-col w-full space-y-2' defaultIndex={0}>
                <Tab.List as={'div'} className='flex flex-row w-full bg-white p-1 rounded space-x-2 items-center justify-between'>
                    <Tab as='div' className={'outline-none flex flex-1 items-center justify-center'}>
                        {({selected})=>(
                            <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} w-full transition-all p-2 rounded`}>Schedule</button>
                        )}
                    </Tab>
                    <Tab as='div' className={'outline-none flex flex-1 items-center justify-center'}>
                        {({selected})=>(
                            <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} w-full transition-all p-2 rounded`}>League</button>
                        )}
                    </Tab>
                    <Tab as='div' className={'outline-none flex flex-1 items-center justify-center'}>
                        {({selected})=>(
                            <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} w-full transition-all p-2 rounded`}>League</button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels as='div' className={'overflow-auto w-full'}>
                    <Tab.Panel>
                        <CreateSchedule leagueId={leagueId}/>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}