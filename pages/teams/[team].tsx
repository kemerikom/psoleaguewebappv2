import { matchType, teamsType } from "../../typings"
import {IoHeartOutline, IoThumbsUpOutline, IoThumbsDownOutline} from 'react-icons/io5'
import { useEffect,useState } from "react";
import { playerNamesType } from "../../typings";
import Link from "next/link";
import { Tab } from '@headlessui/react'
import ReactCountryFlag from "react-country-flag";
import LastMatches from "../../components/teams/LastMatches";
import { FaCrown } from "react-icons/fa";
import FormationPage from "../../components/formations/FormationPage";


export default function Team({team,matches}:{team:teamsType,matches:matchType[]}){
    return(
        <div className="flex flex-col max-w-5xl w-full mx-auto rounded p-2 space-y-2 bg-white backdrop-blur-sm bg-opacity-70">
            {/* <div className="flex flex-row h-40">
                <div className="flex items-center h-full aspect-square">
                    <img className="h-full aspect-square rounded-full" src="/teamlogo.png"></img>
                </div>
                <div className="flex flex-col w-full items-start p-3 space-y-1">
                    <h1>{team.name} [{team.shortname}]</h1>
                    <ReactCountryFlag countryCode={team.origin} svg title={team.origin} style={{width:'30px'}}/>


                    <div className="flex flex-row items-center space-x-1">
                        <FaCrown className="text-xl"/>
                        <Link href={`/players/${team.captain}`} className='link'>{team.players.find((player)=>player.id==team.captain)?.username}</Link>
                    </div>

                    <div className="flex flex-row items-center space-x-1">
                        <FaCrown className="text-xl"/>
                        <Link href={`/players/${team.cocaptain}`} className='link'>{team.players.find((player)=>player.id==team.cocaptain)?.username}</Link>
                    </div>

                </div>
                <div>
                    <div className="flex flex-row-reverse space-x-2">
                        <label className="flex flex-row space-x-1 mx-1 items-center justify-center text-lg cursor-pointer">
                            {team.followers?`${team.followers.length+1}`:0}
                            <IoHeartOutline/>
                        </label>
                        <div className="flex flex-row space-x-2 mx-1 border border-black rounded px-1">
                            <label className="flex flex-row items-center justify-center text-lg cursor-pointer">
                                <IoThumbsUpOutline/>
                                {team.upvote?`${team.upvote.length}`:0}
                            </label>
                            <label className="flex flex-row space-x-1 items-center justify-center text-lg cursor-pointer">
                                <IoThumbsDownOutline/>
                                {team.downvote?`${team.downvote.length}`:0}
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
                        <PlayerList teamId={team._id}></PlayerList>
                    </Tab.Panel>
                    <Tab.Panel className={'flex w-full p-2 items-center justify-center bg-white rounded'}>
                        <FormationPage
                        color1={team.color1}
                        color2={team.color2}
                        fontcolor={team.fontcolor}
                        roster={team.roster}
                        formation={team.formation}
                        players={team.players}
                        />
                    </Tab.Panel>
                    <Tab.Panel className={'flex w-full p-2 bg-white rounded'}>
                        <TrophyRoom teamId={data._id} color1={data.color1} color2={data.color2}/>
                    </Tab.Panel>
                    <Tab.Panel className={'flex w-full p-2 bg-white rounded'}>
                        <LastMatches matches={matches}/>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group> */}
        </div>
    )
}


/* export async function getStaticProps({params}:{params:{team:string}}) {
    const resTeam = await fetch(`${process.env.appPath}/api/getTeamApi`,{
        method:'POST',
        body:JSON.stringify({teamId:params.team})
    })
    const resMatches= await fetch(`${process.env.appPath}/api/getMatchesByTeamIdApi`,{
        method:'POST',
        body:JSON.stringify({teamId:params.team})
    })
    const team = await resTeam.json()
    const matches= await resMatches.json()
    return{
        props:{team,matches},
        revalidate:60
    }
}


export async function getStaticPaths() {
    const res = await fetch(`${process.env.appPath}/api/getTeamIdsApi`)
    const result = await res.json()
    const paths=result.map((r:any)=>{
        return{
            params:{team:r._id}
        }
    })
    return{
        paths,
        fallback:false
    }
} */