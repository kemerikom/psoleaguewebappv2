'use client'
import { leagueName } from "../../../typings"
import { Tab } from '@headlessui/react'
import CreateSchedule from "./CreateSchedule"
import EditSchedule from "./EditSchedule"

export default function PageView({leagueId,data}:{leagueId:string,data:leagueName}){
    return(
        <div className="flex flex-col">
            <Tab.Group as={'div'} className='flex flex-col w-full space-y-2' defaultIndex={0}>
                <Tab.List as={'div'} className='flex flex-row w-full bg-white p-1 rounded space-x-2 items-center justify-between'>
                    {!data.alive&&
                        <Tab as='div' className={'outline-none flex flex-1 items-center justify-center'}>
                            {({selected})=>(
                                <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} w-full transition-all p-2 rounded`}>Create Schedule</button>
                            )}
                        </Tab>
                    }
                    {data.alive&&
                        <Tab as='div' className={'outline-none flex flex-1 items-center justify-center'}>
                            {({selected})=>(
                                <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} w-full transition-all p-2 rounded`}>Edit Schedule</button>
                            )}
                        </Tab>
                    }
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
                    {!data.alive&&
                    <Tab.Panel>
                        <CreateSchedule leagueId={leagueId}/>
                    </Tab.Panel>
                    }
                    {data.alive&&
                    <Tab.Panel>
                        <EditSchedule leagueId={leagueId}/>
                    </Tab.Panel>
                    }
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}