'use client'
import { teamsType } from "../../../typings";
import ReactCountryFlag from "react-country-flag";
import {RiVipCrown2Fill} from 'react-icons/ri'
import Link from "next/link";
import { Tab } from '@headlessui/react'
import PlayerList from "./PlayerList";


export default function PageView({data}:{data:teamsType}){
    return(
        <div className="flex flex-col rounded p-2 flex-1 space-y-2 bg-white backdrop-blur-sm bg-opacity-70">
            <div className="flex flex-row h-40">
                <div className="flex items-center h-full aspect-square">
                    <img className="h-full aspect-square rounded-full" src="/teamlogo.png"></img>
                </div>
                <div className="flex flex-col w-full items-start p-3 space-y-1">
                    <h1>{data.name} [{data.shortname}]</h1>
                    <ReactCountryFlag countryCode="TR" svg title="TR" style={{width:'30px'}}/>
                    <div className="flex flex-row items-center space-x-1">
                        <RiVipCrown2Fill className="text-xl"/>
                        <Link href='/'>Recarmon</Link>
                    </div>
                    <div className="flex flex-row items-center space-x-1">
                        <RiVipCrown2Fill className="text-xl"/>
                        <Link href='/'>AdamC</Link>
                    </div>
                </div>
            </div>
            <Tab.Group>
                <Tab.List className={'flex w-full bg-white p-1 items-center justify-center rounded outline-none'}>
                    <Tab className={'outline-none'}>
                        {({selected})=>(
                            <div className={`${selected?'bg-blue-600 text-white':'text-black'} p-2 rounded`}>Players</div>
                        )}
                    </Tab>
                    <Tab className={'outline-none'}>
                        {({selected})=>(
                            <div className={`${selected?'bg-blue-600 text-white':'text-black'} p-2 rounded`}>Formation</div>
                        )}
                    </Tab>
                    <Tab className={'outline-none'}>
                        {({selected})=>(
                            <div className={`${selected?'bg-blue-600 text-white':'text-black'} p-2 rounded`}>Trophy Room</div>
                        )}
                    </Tab>
                    <Tab className={'outline-none'}>
                        {({selected})=>(
                            <div className={`${selected?'bg-blue-600 text-white':'text-black'} p-2 rounded`}>Last Matches</div>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels className={'outline-none'}>
                    <Tab.Panel className={'flex w-full p-2 bg-white rounded'}>
                        <PlayerList teamId={data._id}></PlayerList>
                    </Tab.Panel>
                    <Tab.Panel className={'flex w-full p-2 bg-white rounded'}>
                        Formation
                    </Tab.Panel>
                    <Tab.Panel className={'flex w-full p-2 bg-white rounded'}>
                        Trophy Room
                    </Tab.Panel>
                    <Tab.Panel className={'flex w-full p-2 bg-white rounded'}>
                        Last Matches
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}