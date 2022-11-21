'use client'
import { teamsType } from "../../../typings";
import ReactCountryFlag from "react-country-flag";
import {RiVipCrown2Fill} from 'react-icons/ri'
import Link from "next/link";
import { Tab } from '@headlessui/react'
import PlayerList from "./PlayerList";
import { useEffect,useState } from "react";
import {playerNamesType}from '../../../typings'
import { leagueUrl } from "../../../utils/src/leagueUrl";
import {IoHeartOutline, IoThumbsUpOutline, IoThumbsDownOutline} from 'react-icons/io5'
import FormationPage from "../../../components/formations/FormationPage";
import TrophyRoom from "./TrophyRoom";
import LastMatches from "./LastMatches";


export default function PageView({data}:{data:teamsType}){
    const [captain,setCaptain]=useState<playerNamesType>()
    const [coCaptain,setCoCaptain]=useState<playerNamesType>()
    const [loadingCaptain,setLoadingCaptain]=useState<boolean>(true)
    useEffect(()=>{
        getCaptainAndCo()
    },[data])
    return(
        <div className="flex flex-col mx-auto rounded p-2 space-y-2 bg-white backdrop-blur-sm bg-opacity-70">
            <div className="flex flex-row h-40">
                <div className="flex items-center h-full aspect-square">
                    <img className="h-full aspect-square rounded-full" src="/teamlogo.png"></img>
                </div>
                <div className="flex flex-col w-full items-start p-3 space-y-1">
                    <h1>{data.name} [{data.shortname}]</h1>
                    <ReactCountryFlag countryCode={data.origin} svg title={data.origin} style={{width:'30px'}}/>
                    {loadingCaptain&&
                    <>
                    <div className="flex flex-row items-center space-x-1 blur-sm animate-pulse">
                        <RiVipCrown2Fill className="text-xl"/>
                        <h3>Captain</h3>
                    </div>
                    <div className="flex flex-row items-center space-x-1 blur-sm animate-pulse">
                        <RiVipCrown2Fill className="text-xl"/>
                        <h3>Co-Captaion</h3>
                    </div>
                    </>
                    }
                    {!loadingCaptain&&captain&&
                    <>
                    <div className="flex flex-row items-center space-x-1">
                        <RiVipCrown2Fill className="text-xl"/>
                        <Link href='/'>{captain?.username}</Link>
                    </div>
                        {coCaptain&&
                        <div className="flex flex-row items-center space-x-1">
                            <RiVipCrown2Fill className="text-xl"/>
                            <Link href='/'>{coCaptain?.username}</Link>
                        </div>
                        }
                    </>
                    }
                    
                </div>
                <div>
                    <div className="flex flex-row-reverse space-x-2">
                        <label className="flex flex-row space-x-1 mx-1 items-center justify-center text-lg cursor-pointer">
                            {data.followers?`${data.followers.length+1}`:0}
                            <IoHeartOutline/>
                        </label>
                        <div className="flex flex-row space-x-2 mx-1 border border-black rounded px-1">
                            <label className="flex flex-row items-center justify-center text-lg cursor-pointer">
                                <IoThumbsUpOutline/>
                                {data.upvote?`${data.upvote.length}`:0}
                            </label>
                            <label className="flex flex-row space-x-1 items-center justify-center text-lg cursor-pointer">
                                <IoThumbsDownOutline/>
                                {data.downvote?`${data.downvote.length}`:0}
                            </label>
                        </div>
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
                    <Tab.Panel className={'flex w-full p-2 items-center justify-center bg-white rounded'}>
                        <FormationPage
                        color1={data.color1}
                        color2={data.color2}
                        fontcolor={data.fontcolor}
                        roster={data.roster}
                        formation={data.formation}
                        />
                    </Tab.Panel>
                    <Tab.Panel className={'flex w-full p-2 bg-white rounded'}>
                        <TrophyRoom teamId={data._id} color1={data.color1} color2={data.color2}/>
                    </Tab.Panel>
                    <Tab.Panel className={'flex w-full p-2 bg-white rounded'}>
                        <LastMatches teamId={data._id}/>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
    async function getCaptainAndCo() {
        setLoadingCaptain(true)
        fetch(`${leagueUrl}/api/getUserNameApi`,{
            method:'POST',
            body:JSON.stringify({userId:data.captain})
        })
        .then((res)=>{
            const dataRes= res.json()
            return dataRes
        })
        .then((data:playerNamesType)=>{
            setCaptain(data)
        })

        fetch(`${leagueUrl}/api/getUserNameApi`,{
            method:'POST',
            body:JSON.stringify({userId:data.cocaptain})
        })
        .then((res)=>{
            const dataRes= res.json()
            return dataRes
        })
        .then((data:playerNamesType)=>{
            setCoCaptain(data)
        })
        setLoadingCaptain(false)
    }
}