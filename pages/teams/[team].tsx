import { matchType, teamsType } from "../../typings"
import {IoHeartOutline, IoHeart, IoThumbsUpOutline, IoThumbsUp, IoThumbsDownOutline, IoThumbsDown, IoPeopleCircle} from 'react-icons/io5'
import Link from "next/link";
import { Tab } from '@headlessui/react'
import ReactCountryFlag from "react-country-flag";
import LastMatches from "../../components/teams/LastMatches";
import { FaCrown } from "react-icons/fa";
import FormationPage from "../../components/formations/FormationPage";
import { getTeamIds,getTeam } from "../../utils/mongodb/getTeams";
import { getMatchByTeamId } from "../../utils/mongodb/getMatches";
import Head from "next/head";
import PlayerList from "../../components/teams/PlayerList";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext } from 'react'
import { SiteContext } from "../../context/SiteContext"

export default function Team({team, matches}:{team:teamsType, matches:matchType[]}){
    const siteData = useContext(SiteContext)
    const {uid} = siteData
    const [followers, setFollowers] = useState<string[]>(team.followers || [])
    const [upVotes, setUpVotes] = useState<string[]>(team.upvote || [])
    const [downVotes, setDownVotes] = useState<string[]>(team.downvote || [])
    return(
        <div className="flex flex-col max-w-5xl w-full mx-auto rounded p-2 space-y-2 bg-white backdrop-blur-sm bg-opacity-70">
            <Head>
                <meta property="og:type" content="website"></meta>
                <meta property="og:url"  content={`${process.env.appPath}/teams/${team._id.toString()}`}></meta>
                <meta property="og:title" content={`${team.name}`}></meta>
                <meta property="og:description" content={`${team.name} looking for new members`}></meta>
                <meta property="og:image" content={`${process.env.appPath}/teams/${team._id.toString()}}]`}></meta>
                <meta name="og:country-name" content="TR"></meta>
            </Head>
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
            <div id='header' className="flex flex-row h-40">
                <div className="flex items-center h-full aspect-square">
                    {team.logo && 
                        <img className="h-full aspect-square rounded-full" src={`${process.env.storagePath}/teamlogos/${team.logo}`}></img>
                    }
                    {!team.logo &&
                        <div className="flex h-full aspect-square rounded-full items-center justify-center"
                        style={{backgroundColor: team.color1}}>
                            <IoPeopleCircle className="text-9xl"
                            style={{color: team.color2}}
                            />
                        </div>
                        
                    }
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
                        {followers?.includes(uid || 'XX') && 
                            <label className="flex flex-row space-x-1 mx-1 items-center justify-center text-lg cursor-pointer" onClick={unFavTeam}>
                                {followers?`${followers.length}`:0}
                                <IoHeart className="text-pink-800"/>
                            </label>
                        }
                        {!followers?.includes(uid || 'XX') &&
                            <label className="flex flex-row space-x-1 mx-1 items-center justify-center text-lg cursor-pointer" onClick={favTeam}>
                                {followers?`${followers.length}`:0}
                                <IoHeartOutline/>
                            </label>
                        }
                        <div className="flex flex-row space-x-2 mx-1 border border-black rounded px-1">
                            {upVotes.includes(uid || 'XX') && 
                                <label className="flex flex-row items-center justify-center text-lg cursor-pointer" onClick={unUpVoteTeam}>
                                    <IoThumbsUp/>
                                    {upVotes?`${upVotes.length}`:0}
                                </label>
                            }
                            {!upVotes.includes(uid || 'XX') && 
                                <label className="flex flex-row items-center justify-center text-lg cursor-pointer" onClick={upVoteTeam}>
                                    <IoThumbsUpOutline/>
                                    {upVotes?`${upVotes.length}`:0}
                                </label>
                            }
                            {downVotes.includes(uid || 'XX') && 
                                <label className="flex flex-row space-x-1 items-center justify-center text-lg cursor-pointer" onClick={unDownVoteTeam}>
                                    <IoThumbsDown/>
                                    {downVotes?`${downVotes.length}`:0}
                                </label>
                            }
                            {!downVotes.includes(uid || 'XX') && 
                                <label className="flex flex-row space-x-1 items-center justify-center text-lg cursor-pointer" onClick={downVoteTeam}>
                                    <IoThumbsDownOutline/>
                                    {downVotes?`${downVotes.length}`:0}
                                </label>
                            }
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
                <Tab.Panels className={'flex outline-none items-center justify-center'}>
                    <Tab.Panel className={'flex w-full p-2 rounded items-center justify-center'}>
                        <PlayerList players={team.players} />
                    </Tab.Panel>
                    <Tab.Panel className={'flex w-full p-2 max-w-2xl items-center justify-center bg-white rounded'}>
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
                        {/* <TrophyRoom teamId={data._id} color1={data.color1} color2={data.color2}/> */}
                    </Tab.Panel>
                    <Tab.Panel className={'flex w-full p-2 bg-white rounded'}>
                        <LastMatches matches={matches}/>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
    async function favTeam(){
        const res = await fetch (`${process.env.appPath}/api/favTeamApi`,{
            method: 'POST',
            body: JSON.stringify({teamId: team._id.toString()})
        })
        const result = await res.json()
        if (res.status != 200) {
            toast.error(result)
        }else{
            setFollowers((favs) => [...favs, uid || 'XX'])
            toast.success(`You are following ${team.name}`)
        }
    }

    async function unFavTeam() {
        const res = await fetch (`${process.env.appPath}/api/unFavTeamApi`,{
            method: 'POST',
            body: JSON.stringify({teamId: team._id.toString()})
        })
        const result = await res.json()
        if (res.status != 200) { 
            toast.error(result)
        }else{
            setFollowers(followers.filter((fav) => fav != (uid || 'XX')))
            toast.success(`You are not following ${team.name}`)
        }
    }

    async function upVoteTeam(){
        const res = await fetch (`${process.env.appPath}/api/upVoteTeamApi`,{
            method: 'POST',
            body: JSON.stringify({teamId: team._id.toString()})
        })
        const result = await res.json()
        if (res.status != 200) {
            toast.error(result)
        }else{
            if(upVotes.includes(uid || 'XX')){
                setUpVotes(upVotes.filter((ups) => ups != (uid || 'XX')))
            }else{
                setUpVotes((ups) => [...ups, uid || 'XX'])
                if (downVotes.includes(uid || 'XX')) setDownVotes(downVotes.filter((downs) => downs != (uid || 'XX')))
            }
            toast.success(`Your vote successfully changed`)
        }
    }

    async function unUpVoteTeam(){
        const res = await fetch (`${process.env.appPath}/api/unUpVoteTeamApi`,{
            method: 'POST',
            body: JSON.stringify({teamId: team._id.toString()})
        })
        const result = await res.json()
        if (res.status != 200) {
            toast.error(result)
        }else{
            if(upVotes.includes(uid || 'XX')){
                setUpVotes(upVotes.filter((ups) => ups != (uid || 'XX')))
            }else{
                setUpVotes((ups) => [...ups, uid || 'XX'])
                if (downVotes.includes(uid || 'XX')) setDownVotes(downVotes.filter((downs) => downs != (uid || 'XX')))
            }
            toast.success(`Your vote successfully changed`)
        }
    }

    async function downVoteTeam() {
        const res = await fetch (`${process.env.appPath}/api/downVoteTeamApi`,{
            method: 'POST',
            body: JSON.stringify({teamId: team._id.toString()})
        })
        const result = await res.json()
        if (res.status != 200) {
            toast.error(result)
        }else{
            if(downVotes.includes(uid || 'XX')){
                setDownVotes(downVotes.filter((downs) => downs != (uid || 'XX')))
            }else{
                setDownVotes((downs) => [...downs, uid || 'XX'])
                if (upVotes.includes(uid || 'XX')) setUpVotes(upVotes.filter((ups) => ups != (uid || 'XX')))
            }
            toast.success(`Your vote successfully changed`)
        }
    }

    async function unDownVoteTeam() {
        const res = await fetch (`${process.env.appPath}/api/unDownVoteTeamApi`,{
            method: 'POST',
            body: JSON.stringify({teamId: team._id.toString()})
        })
        const result = await res.json()
        if (res.status != 200) {
            toast.error(result)
        }else{
            if(downVotes.includes(uid || 'XX')){
                setDownVotes(downVotes.filter((downs) => downs != (uid || 'XX')))
            }else{
                setDownVotes((downs) => [...downs, uid || 'XX'])
                if (upVotes.includes(uid || 'XX')) setUpVotes(upVotes.filter((ups) => ups != (uid || 'XX')))
            }
            toast.success(`Your vote successfully changed`)
        }
    }
}


export async function getStaticProps({params}:{params:{team:string}}) {
    const resTeam=await getTeam({teamId:params.team})
    const team=JSON.parse(JSON.stringify(resTeam))
    const resMatches= await getMatchByTeamId({teamId:params.team})
    const matches=JSON.parse(JSON.stringify(resMatches))
    return{
        props:{team,matches},
        revalidate: 5
    }
}


export async function getStaticPaths() {
    const result = await getTeamIds()
    const paths=result.map((r:any)=>{
        return{
            params:{team:r._id.toString()}
        }
    })
    return{
        paths,
        fallback:'blocking'
    }
}