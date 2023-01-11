import SettingsList from "../../components/settings/SettingList"
import { withIronSessionSsr } from "iron-session/next"
import { getUserByUid } from "../../utils/mongodb/getUsers"
import Header from "../../components/settings/Header"
import { playerType, teamsType } from "../../typings"
import { getTeamByPlayer } from "../../utils/mongodb/getTeams"

export default function Index({user,userTeam}:{user:playerType,userTeam:teamsType}){
    return(
        <div className='flex flex-row container p-3 items-start'>
            <SettingsList/>
            <div className='flex w-full flex-col'>
                <Header user={user} userTeam={userTeam}/>
                <div className="p-2 bg-white backdrop-blur-sm bg-opacity-70 rounded my-2">
                    
                </div>

            </div>
        </div>
    )
}



export const getServerSideProps=withIronSessionSsr(
    async function getServerSideProps({req}) {
        const userUid=req.session.user
        let userData=null
        let userTeam=null
        if(userUid){
            const {uid} = userUid
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