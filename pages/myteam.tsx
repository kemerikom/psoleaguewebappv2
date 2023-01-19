import {withIronSessionSsr} from 'iron-session/next'
import { teamsType } from '../typings'
import Link from 'next/link'
import { FaCrown } from 'react-icons/fa'
import { Tab } from '@headlessui/react'
import PlayerList from '../components/myteam/PlayerList'
import FormationPage from '../components/formations/FormationPage'
import FormationEdit from '../components/myteam/FormationEdit'
import { getUserByUid } from '../utils/mongodb/getUsers'
import { getTeam, getTeamByUserId } from '../utils/mongodb/getTeams'
import { withSessionSsr } from '../utils/src/ironSessionHandlers'
import Settings from '../components/myteam/Settings'

export default function MyTeam({data}:{data:teamsType}){
    return(
        <div className='flex flex-col space-y-2 max-w-4xl w-full my-3 mx-auto p-3 bg-white backdrop-blur-sm bg-opacity-70 rounded'>
            <div className='flex flex-row space-x-2'>
                <div className='flex w-32 aspect-square rounded-full'>
                    <img src={`https://storage.googleapis.com/psoleaguev2.appspot.com/teamlogos/${data.logo}`} className='flex w-full aspect-square rounded-full'></img>
                </div>
                <div className='flex-col'>
                    <h1 className='flex space-x-1'>
                        <Link href={`/teams/${data._id.toString()}`} className='link'>{data.name}</Link>
                        <Link href={`/teams/${data._id.toString()}`} className='link'>[{data.shortname}]</Link>
                    </h1>
                    <Link href={`/players/${data.captain}`} className='link flex flex-row items-center'>
                        <FaCrown className='mr-2'/>
                        {data.players.find((player)=>player.id==data.captain)?.username}
                    </Link>
                    <Link href={`/players/${data.captain}`} className='link flex flex-row items-center'>
                        <FaCrown className='mr-2'/>
                        {data.players.find((player)=>player.id==data.cocaptain)?.username}
                    </Link>
                </div>
            </div>
            <Tab.Group className='flex flex-col w-full space-y-2' as='div'>
                <Tab.List className={'flex items-center space-x-1 bg-white rounded justify-between'}>
                    <Tab className={'flex flex-1 p-1 items-center justify-center'}>
                        {({selected})=>(
                            <div className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} hover:bg-blue-800 hover:text-white p-2 rounded w-full transition-all`}>Players</div>
                        )}
                    </Tab>
                    <Tab className={'flex flex-1 p-1 items-center justify-center'}>
                        {({selected})=>(
                            <div className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} hover:bg-blue-800 hover:text-white p-2 rounded w-full transition-all`}>Formation</div>
                        )}
                    </Tab>
                    <Tab className={'flex flex-1 p-1 items-center justify-center'}>
                        {({selected})=>(
                            <div className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} hover:bg-blue-800 hover:text-white p-2 rounded w-full transition-all`}>Leagues</div>
                        )}
                    </Tab>
                    <Tab className={'flex flex-1 p-1 items-center justify-center'}>
                        {({selected})=>(
                            <div className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} hover:bg-blue-800 hover:text-white p-2 rounded w-full transition-all`}>Settings</div>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel className={'flex p-2'}>
                        <PlayerList players={data.players}/>
                    </Tab.Panel>
                    <Tab.Panel className={'flex p-2'}>
                        <FormationEdit data={data}/>
                    </Tab.Panel>
                    <Tab.Panel className={'flex p-2'}>
                        
                    </Tab.Panel>
                    <Tab.Panel className={'flex p-2'}>
                        <Settings data={data}/>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}


export const getServerSideProps= withSessionSsr(
    async function getServerSideProps({req}) {
        const userUid = req.session.user
        if(userUid && userUid.uid){
            const user = await getUserByUid({uid: userUid.uid})
            if(user){
                const team = await getTeam({teamId: user.teamid})
                if (team){
                    if(team.captain == user._id.toString() || team.cocaptain == user._id.toString()){
                        return {
                            props:{data: JSON.parse(JSON.stringify(team))}
                        }
                    }else{
                        return {
                            redirect: {
                                permanent: false,
                                destination: `teams/${team._id.toString()}`
                            }
                        }
                    }
                }else{
                    return {
                        redirect:{
                            permanent: false,
                            destination: 'createteam'
                        }
                    }
                }
            }else{
                return{
                    redirect:{
                        permanent: false,
                        destination: 'auth/login'
                    }
                }
            }
        }else{
            return{
                redirect:{
                    permanent: false,
                    destination: 'auth/login'
                }
            }
        }
        return{
            props:{}
        }
    }
)


/* export const getServerSideProps=withIronSessionSsr(
    async function getServerSideProps({req}) {
        const userUid=req.session.user
        let data=null
        if(userUid){
            const {uid}=userUid
            const user = await getUserByUid({uid:uid||'null'})
            if(user){
                const team = await getTeamByUserId({userId:user?._id.toString()})
                if(team)data=team
            }
            
        } 
        return{
            props:{
                data
            }
        }
    },{
        cookieName:process.env.ironCookie,
        password:process.env.ironPassword,
        cookieOptions:{
            secure:process.env.NODE_ENV==='production'
        }
    }
) */