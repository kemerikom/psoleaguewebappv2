import { medalType, playerType, transferType } from "../../typings"
import { getPlayerIds,getPlayer } from "../../utils/mongodb/getUsers"
import Head from "next/head"
import { getTeam } from "../../utils/mongodb/getTeams"
import {teamsType} from '../../typings'
import MedalRoom from "../../components/players/MedalRoom"
import TeamHistory from "../../components/players/TeamHistory"
import { getTransferByUserId } from "../../utils/mongodb/getTransfers"
import ReactCountryFlag from "react-country-flag";
import { Tab } from "@headlessui/react"
import Link from "next/link"
import {IoHeartOutline, IoThumbsUpOutline, IoThumbsDownOutline, IoFootball, IoPeopleCircle, IoHeart, IoThumbsUp, IoThumbsDown} from 'react-icons/io5'
import { BiTransferAlt } from "react-icons/bi"
import { getUserMedals } from "../../utils/mongodb/getMedals"
import { ToastContainer, toast } from 'react-toastify'
import { useState, useContext} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { SiteContext } from "../../context/SiteContext"


export default function Player({data,team,transfers,medals}:{data:playerType,team:teamsType,transfers:transferType[],medals:medalType[]}){
    const siteData = useContext(SiteContext)
    const {uid} = siteData
    const [loading, setLoading] = useState<boolean>(false)
    const [followers, setFollowers] = useState<string[]>(data.followers || [])
    const [upVotes, setUpVotes] = useState<string[]>(data.upvote || [])
    const [downVotes, setDownVotes] = useState<string[]>(data.downvote || [])
    return(
        <div className="max-w-5xl mx-auto p-3 w-full">
            <Head>
                <meta property="og:type" content="website"></meta>
                <meta property="og:url"  content={`${process.env.appPath}/teams/${data._id.toString()}`}></meta>
                <meta property="og:title" content={`${data.username}`}></meta>
                <meta property="og:image" content={`https://storage.googleapis.com/psoleaguev2.appspot.com/players/cards/${data.card}`}></meta>
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
            <div className="flex flex-col mx-auto rounded p-2 space-y-2 bg-white backdrop-blur-sm bg-opacity-70">
                <div className="flex flex-row h-40">
                    <div className="flex items-center h-full aspect-square">
                        <img src={`${data.avatar?.large||'/defaultAvatar.svg'}`} className="h-full aspect-square rounded-full" ></img>
                    </div>
                    <div className="flex flex-col w-full items-start p-3 space-y-2">
                        <h1>{data.username} <Link href={`/teams/${team?._id}`} className={`${team?'visible':'invisible'} hover:underline transition-all`}>[{team?.shortname||''}]</Link></h1>
                        <ReactCountryFlag countryCode={data.country} svg title={data.country} style={{width:'30px'}}/>
                        {team&&
                        <div className="flex flex-row space-x-2">
                            <div className="flex w-6 aspect-square rounded-full items-center justify-center">
                                {team.logo && 
                                    <img className="w-full aspect-square rounded-full" src={`${process.env.storagePath}/teamlogos/${team.logo}`}/>
                                }
                                {!team.logo &&
                                <div className="flex w-6 h-6 aspect-square items-center justify-center rounded-full"
                                style={{backgroundColor: team.color1}}
                                >
                                    <IoPeopleCircle className="text-xs"
                                    style={{color: team.color2}}
                                    />
                                </div>
                                
                                }
                            </div>
                            <div className="flex h-full items-center justify-center">
                                <Link className="flex items-center justify-center hover:underline transition-all" href={`/teams/${team._id}`}>{team.name}</Link>
                            </div>
                        </div>
                        }
                        <div className="flex flex-row space-x-2">
                            <div className=" flex w-6 aspect-square rounded-full bg-green-600 items-center justify-center text-xs text-white cursor-default">
                                <label>{data.mainpos}</label>
                            </div>
                            <div className=" flex w-6 aspect-square rounded-full bg-green-600 items-center justify-center text-xs text-white">
                                <label>{data.secondpos}</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row-reverse space-x-2">
                            {followers?.includes(uid || 'XX') && 
                                <label className="flex flex-row space-x-1 mx-1 items-center justify-center text-lg cursor-pointer" onClick={unFavPerson}>
                                    {followers?`${followers.length}`:0}
                                    <IoHeart className="text-pink-800"/>
                                </label>
                            }
                            {!followers?.includes(uid || 'XX') &&
                                <label className="flex flex-row space-x-1 mx-1 items-center justify-center text-lg cursor-pointer" onClick={favPerson}>
                                    {followers?`${followers.length}`:0}
                                    <IoHeartOutline/>
                                </label>
                            }
                            <div className="flex flex-row space-x-2 mx-1 border border-black rounded px-1">
                                {upVotes.includes(uid || 'XX') && 
                                    <label className="flex flex-row items-center justify-center text-lg cursor-pointer" onClick={unUpVotePerson}>
                                        <IoThumbsUp/>
                                        {upVotes?`${upVotes.length}`:0}
                                    </label>
                                }
                                {!upVotes.includes(uid || 'XX') && 
                                    <label className="flex flex-row items-center justify-center text-lg cursor-pointer" onClick={upVotePerson}>
                                        <IoThumbsUpOutline/>
                                        {upVotes?`${upVotes.length}`:0}
                                    </label>
                                }
                                {downVotes.includes(uid || 'XX') && 
                                    <label className="flex flex-row space-x-1 items-center justify-center text-lg cursor-pointer" onClick={unDownVotePerson}>
                                        <IoThumbsDown/>
                                        {downVotes?`${downVotes.length}`:0}
                                    </label>
                                }
                                {!downVotes.includes(uid || 'XX') && 
                                    <label className="flex flex-row space-x-1 items-center justify-center text-lg cursor-pointer" onClick={downVotePerson}>
                                        <IoThumbsDownOutline/>
                                        {downVotes?`${downVotes.length}`:0}
                                    </label>
                                }
                            </div>
                            <button className="btnPrimary" onClick={sendTransferOffer}>
                                {loading &&
                                    <IoFootball className="text-lg animate-spin"/>
                                }
                                {!loading &&
                                    <BiTransferAlt className="text-lg"/>
                                }
                                
                            </button>
                        </div>
                    </div>
                </div>
                <Tab.Group>
                    <Tab.List className={'flex w-full bg-white p-1 items-center justify-center rounded outline-none space-x-2'}>
                        <Tab className={'outline-none flex flex-1 items-center justify-center'}>
                            {({selected})=>(
                                <div className={`${selected?'bg-blue-600 text-white':'text-black'} p-2 hover:bg-blue-800 hover:text-white rounded w-full items-center justify-center transition-all`}>Team History</div>
                            )}
                        </Tab>
                        <Tab className={'outline-none flex flex-1 items-center justify-center'}>
                            {({selected})=>(
                                <div className={`${selected?'bg-blue-600 text-white':'text-black'} p-2 hover:bg-blue-800 hover:text-white rounded w-full items-center justify-center transition-all`}>Medals</div>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className={'outline-none'}>
                        <Tab.Panel className={'flex w-full p-2 bg-white rounded'}>
                            <TeamHistory transfers={transfers}/>
                        </Tab.Panel>
                        <Tab.Panel className={'flex w-full p-2 bg-white rounded'}>
                            <MedalRoom medals={medals}/>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )

    async function sendTransferOffer(){
        setLoading(true)
        const res = await fetch(`${process.env.appPath}/api/sendTransferOfferApi`,{
            method:'POST',
            body:JSON.stringify({
                userId: data._id.toString()
            })
        })
        const result = await res.json()
        if(res.status == 200){
            toast.success('Transfer offer succesfully sended')
        }else{
            toast.error(result)
        }
        setLoading(false)
    }

    async function favPerson(){
        const res = await fetch (`${process.env.appPath}/api/favPlayerApi`,{
            method: 'POST',
            body: JSON.stringify({playerId: data._id.toString()})
        })
        const result = await res.json()
        if (res.status != 200) {
            toast.error(result)
        }else{
            setFollowers((favs) => [...favs, uid || 'XX'])
            toast.success(`You are following ${data.username}`)
        }
    }

    async function unFavPerson() {
        const res = await fetch (`${process.env.appPath}/api/unFavPlayerApi`,{
            method: 'POST',
            body: JSON.stringify({playerId: data._id.toString()})
        })
        const result = await res.json()
        if (res.status != 200) { 
            toast.error(result)
        }else{
            setFollowers(followers.filter((fav) => fav != (uid || 'XX')))
            toast.success(`You are not following ${data.username}`)
        }
    }

    async function upVotePerson(){
        const res = await fetch (`${process.env.appPath}/api/upVotePlayerApi`,{
            method: 'POST',
            body: JSON.stringify({playerId: data._id.toString()})
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

    async function unUpVotePerson(){
        const res = await fetch (`${process.env.appPath}/api/unUpVotePlayerApi`,{
            method: 'POST',
            body: JSON.stringify({playerId: data._id.toString()})
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

    async function downVotePerson() {
        const res = await fetch (`${process.env.appPath}/api/downVotePlayerApi`,{
            method: 'POST',
            body: JSON.stringify({playerId: data._id.toString()})
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

    async function unDownVotePerson() {
        const res = await fetch (`${process.env.appPath}/api/unDownVotePlayerApi`,{
            method: 'POST',
            body: JSON.stringify({playerId: data._id.toString()})
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


export async function getServerSideProps({params}:{params:{player:string}}){
    const resPlayer = await getPlayer({playerId:params.player})
    const player = JSON.parse(JSON.stringify(resPlayer))
    const resTeam= await getTeam({teamId:player.teamid})
    const team =JSON.parse(JSON.stringify(resTeam))
    const resTransfers= await getTransferByUserId({userId:player._id.toString()})
    const transfers= JSON.parse(JSON.stringify(resTransfers))
    const resMedals=await getUserMedals({userId:player._id.toString()})
    const medals=JSON.parse(JSON.stringify(resMedals))
    return{
        props:{data:player,team,transfers,medals},
        //revalidate: 5
    }
}


/* export async function getStaticPaths() {
    const resultPlayer = await getPlayerIds()
    const paths=resultPlayer.map((player)=>{
        return{
            params:{player:player._id.toString()}
        }
    })
    if(process.env.NODE_ENV=='production'){

    }
    return{
        paths,
        fallback:'blocking'
    }
} */