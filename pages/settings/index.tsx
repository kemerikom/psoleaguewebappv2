import SettingsList from "../../components/settings/SettingList"
import { getUserByUid } from "../../utils/mongodb/getUsers"
import Header from "../../components/settings/Header"
import { playerType, teamsType } from "../../typings"
import { getTeamByPlayer } from "../../utils/mongodb/getTeams"
import { withSessionSsr } from "../../utils/src/ironSessionHandlers"

export default function Index({user,userTeam}:{user:playerType,userTeam:teamsType}){
    return(
        <div className='flex flex-row max-w-5xl w-full p-3 items-start'>
            <SettingsList/>
            <div className='flex w-full flex-col'>
                <Header user={user} userTeam={userTeam}/>
            </div>
        </div>
    )
}



export const getServerSideProps = withSessionSsr (
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
            }else{
                return{
                    redirect:{
                        permanent: false,
                        destination: '/auth/login'
                    }
                }
            }
        }else{
            return{
                redirect:{
                    permanent: false,
                    destination: '/auth/login'
                }
            }
        }
        return{
            props:{
                user:JSON.parse(JSON.stringify(userData)),
                userTeam:JSON.parse(JSON.stringify(userTeam))
            }
        } 
    }
)

