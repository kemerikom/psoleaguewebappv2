'use client'
import { leagueName } from "../../../typings"
import { Tab } from '@headlessui/react'
import { Disclosure } from '@headlessui/react'
import {IoChevronDownOutline} from 'react-icons/io5'
import {useEffect,useState} from 'react'
import { leagueUrl } from "../../../utils/src/leagueUrl"
import { seasonNameType,teamsType } from "../../../typings"
import PreviousSeasonPage from "./PreviousSeasonPage"
import LeaguePage from "./LeaguePage"
import TeamsPage from "./TeamsPage"


export default function PageView({data}:{data:leagueName}){
    const [previousSeasons,setPreviousSeasons]=useState([])
    const [teams,setTeams]=useState<teamsType[]>([])
    return(
        <div className="flex flex-1 !w-full p-2 rounded">
            <Tab.Group as={'div'} className='flex flex-col w-full space-y-2' defaultIndex={0}>
                <Tab.List as={'div'} className='flex flex-row w-full bg-white p-1 rounded space-x-2 items-center justify-between'>
                    <Tab as='div' className={'outline-none flex flex-1 items-center justify-center'}>
                        {({selected})=>(
                            <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} w-full transition-all p-2 rounded`}>League</button>
                        )}
                    </Tab>
                    <Tab as='div' className={'outline-none flex flex-1 items-center justify-center'}>
                        {({selected})=>(
                            <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} w-full transition-all p-2 rounded`}>Current Season</button>
                        )}
                    </Tab>
                    <Tab as='div' className={'outline-none flex flex-1 items-center justify-center'}>
                        {({selected})=>(
                            <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} w-full transition-all p-2 rounded`} onClick={()=>getSeasonsInfo()}>Previous Seasons</button>
                        )}
                    </Tab>
                    <Tab as='div' className={'outline-none flex flex-1 items-center justify-center'}>
                        {({selected})=>(
                            <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} w-full transition-all p-2 rounded`} onClick={()=>getTeamsInfo()}>Teams</button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels as='div' className={'overflow-auto w-full'}>
                    <Tab.Panel>
                        <LeaguePage></LeaguePage>
                    </Tab.Panel>
                    <Tab.Panel>
                        Şimdiki sezon
                    </Tab.Panel>
                    <Tab.Panel as='div' className={'flex flex-col bg-white rounded p-2'}>
                        {previousSeasons?.map((season:seasonNameType)=>{
                            return(
                            <Disclosure as='div' key={season._id} className={'w-full items-center justify-center'}>
                                {({open})=>(
                                    <div className="flex flex-col w-full space-y-2">
                                        <Disclosure.Button as='button' className={`${open?'bg-blue-600 text-white':'bg-blue-100 text-black'} flex flex-row items-center justify-between w-full p-1 rounded transition-all outline-none`}>
                                            {season.seasonName}
                                            <IoChevronDownOutline className={`text-2xl ${open?'rotate-180':'rotate-0'} transition-all`}></IoChevronDownOutline>
                                        </Disclosure.Button>
                                        <Disclosure.Panel as='div' className={`flex bg-blue-100 p-1 rounded transition-all`}>
                                            <PreviousSeasonPage seasonId={season._id}></PreviousSeasonPage>
                                        </Disclosure.Panel>
                                    </div>
                                )}
                            </Disclosure>
                            )
                        })}
                    </Tab.Panel>
                    <Tab.Panel as='div' className={'flex flex-col bg-white rounded p-2'}>
                        <TeamsPage teams={teams}></TeamsPage>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
    async function getSeasonsInfo() {
        if(previousSeasons.length==0){
            fetch(`${leagueUrl}/api/getSeasonsApi`,{
                method:'POST',
                body:JSON.stringify({leagueId:data._id})
            })
            .then((res)=>{
                const dataRes= res.json()
                return dataRes
            })
            .then((data)=>{
                setPreviousSeasons(data)
            })
        }
    }
    async function getTeamsInfo() {
        if(teams.length==0){
            fetch(`${leagueUrl}/api/getLeagueTeamsApi`,{
                method:'POST',
                body:JSON.stringify({leagueId:data._id})
            })
            .then((res)=>{
                const dataRes=res.json()
                return dataRes
            })
            .then((data)=>{
                setTeams(data)
            })
        }
    }
}