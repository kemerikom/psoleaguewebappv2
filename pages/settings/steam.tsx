import { withIronSessionSsr } from "iron-session/next"
import { getUserByUid } from "../../utils/mongodb/getUsers"
import { getTeamByPlayer } from "../../utils/mongodb/getTeams"
import Link from "next/link"
import SettingsList from "../../components/settings/SettingList"
import Header from "../../components/settings/Header"
import { playerType, teamsType } from "../../typings"
import {useEffect} from 'react'
import { FaSteam } from "react-icons/fa"
import { auth } from "../../utils/firebase/config"
import { onAuthStateChanged,updateProfile } from "firebase/auth"


export default function Steam({user,userTeam}:{user:playerType,userTeam:teamsType}){
    useEffect(()=>{
        onAuthStateChanged(auth,(userFB)=>{
            if(userFB){
                if(auth.currentUser){
                    if(auth.currentUser.photoURL!=user.avatar?.small){
                        updateProfile(auth.currentUser,{
                            photoURL:user.avatar?.small
                        })
                    }
                }
            }
        })
    },[])
    return(
        <div className='flex flex-row max-w-5xl w-full p-3 items-start'>
            <SettingsList/>
            <div className='flex w-full flex-col'>
                <Header user={user} userTeam={userTeam}/>
                <div className="p-2 bg-white backdrop-blur-sm bg-opacity-70 rounded my-2">
                    <div className='flex flex-col space-y-2 items-center justify-center'>
                        <h1 className='text-center'>Link Your Steam Account</h1>
                        <hr/>
                        {user.steamid&&
                            <>
                                <Link href={`https://steamcommunity.com/profiles/${user.steamid}`} className='flex flex-row bg-blue-600 text-white p-2 rounded indent-2 font-medium hover:bg-blue-800 transition-all'>
                                    <FaSteam className='text-2xl'/>
                                    {user.username}
                                </Link>
                                <Link href={`${process.env.appPath}/api/steamLinkApi`} className='flex flex-row bg-blue-600 text-white p-2 rounded indent-2 font-medium hover:bg-blue-800 transition-all'>
                                    <FaSteam className='text-2xl'/>
                                    Update Your Steam Link
                                </Link>
                            </>
                        }
                        {!user.steamid&&
                            <Link href={`${process.env.appPath}/api/steamLinkApi`} className='flex flex-row bg-blue-600 text-white p-2 rounded indent-2 font-medium hover:bg-blue-800 transition-all'>
                                <FaSteam className='text-2xl'/>
                                Link Your Steam Profile
                            </Link>
                        }
                        
                    </div>
                </div>

            </div>
        </div>

    )
}


export const getServerSideProps=withIronSessionSsr(
    async function getServerSideProps({req}) {
        const userUid=req.session.user
        let userData=null
        let uUid=null
        let userTeam=null
        if(userUid){
            const {uid} = userUid
            uUid=uid
            const user = await getUserByUid({uid:uid||'null'})
            if(user){
                userData=user
                const team = await getTeamByPlayer({userId:user._id.toString()})
                if(team)userTeam=team
            }
        }
        return{
            props:{
                user:JSON.parse(JSON.stringify(userData)),
                uid:uUid,
                userTeam:JSON.parse(JSON.stringify(userTeam))
            }
        }
    },{
        cookieName:process.env.ironCookie,
        password:process.env.ironPassword,
        cookieOptions:{
            secure:process.env.NODE_ENV==='production'
        }
    }
)