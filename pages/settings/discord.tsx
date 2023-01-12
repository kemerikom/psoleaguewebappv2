import { withIronSessionSsr } from "iron-session/next"
import { getUserByUid } from "../../utils/mongodb/getUsers"
import { getTeamByPlayer } from "../../utils/mongodb/getTeams"
import Link from "next/link"
import SettingsList from "../../components/settings/SettingList"
import Header from "../../components/settings/Header"
import { playerType, teamsType } from "../../typings"
import { FaDiscord } from "react-icons/fa"




export default function Discord({user,userTeam}:{user:playerType,userTeam:teamsType}){
    return(
        <div className='flex flex-row max-w-5xl w-full p-3 items-start'>
            <SettingsList/>
            <div className='flex w-full flex-col'>
                <Header user={user} userTeam={userTeam}/>
                <div className="p-2 bg-white backdrop-blur-sm bg-opacity-70 rounded my-2">
                    <div className='flex flex-col space-y-2 items-center justify-center'>
                        <h1 className='text-center'>Link Your Discord Account</h1>
                        <hr/>
                        {user&&user.discordid&&
                            <>
                                <div className='flex flex-row bg-blue-600 text-white p-2 rounded indent-2 font-medium'>
                                    <FaDiscord className='text-2xl'/>
                                    {user?.discordname}
                                </div>
                                <Link href={`${process.env.discordGeneratedUrl}`} className='flex flex-row bg-blue-600 text-white p-2 rounded indent-2 font-medium hover:bg-blue-800 transition-all'>
                                    <FaDiscord className='text-2xl'/>
                                    Update Your Discord Link
                                </Link>
                            </>
                        }
                        {!user||!user.discordid&&
                            <Link href={`${process.env.discordGeneratedUrl}`} className='flex flex-row bg-blue-600 text-white p-2 rounded indent-2 font-medium hover:bg-blue-800 transition-all'>
                                <FaDiscord className='text-2xl'/>
                                Link Your Discord Account
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