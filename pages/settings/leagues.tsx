import { withIronSessionSsr } from "iron-session/next"
import { getUserByUid } from "../../utils/mongodb/getUsers"
import { getTeamByPlayer } from "../../utils/mongodb/getTeams"
import Link from "next/link"
import { IoHeartDislike } from "react-icons/io5"
import SettingsList from "../../components/settings/SettingList"
import Header from "../../components/settings/Header"
import { playerType, teamsType } from "../../typings"


export default function Leagues({user,userTeam}:{user:playerType,userTeam:teamsType}){
    return(
        <div className='flex flex-row max-w-5xl w-full p-3 items-start'>
            <SettingsList/>
            <div className='flex w-full flex-col'>
                <Header user={user} userTeam={userTeam}/>
                <div className="p-2 bg-white backdrop-blur-sm bg-opacity-70 rounded my-2">
                    <div className='flex flex-col space-y-2 items-center justify-center'>
                        <h1 className='text-center'>Following Leagues</h1>
                        <hr/>
                        <div className='flex flex-col max-w-lg w-full space-y-2 p-2 rounded hover:bg-blue-600 hover:text-white transition-all'>
                            <div className="flex flex-row">
                                <Link href={'/'} className='flex flex-row justify-center items-center space-x-2 hover:underline'>
                                    <div className="flex items-center justify-center w-16 aspect-square rounded-full mr-2">
                                        <img src="/teamlogo.png" className="w-full aspect-square rounded-full object-contain"></img>
                                    </div>
                                    Turkish 1st League
                                </Link>
                                <div className="flex ml-auto items-center justify-center">
                                    <IoHeartDislike className="text-2xl"/>
                                </div>
                            </div>
                        </div>
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