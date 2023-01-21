import SearchBar from "../../components/SearchBar"
import {useState,useEffect} from 'react'
import { playerType, teamsType } from "../../typings"
import TeamsPage from "../../components/TeamsPage"
import { withSessionSsr } from "../../utils/src/ironSessionHandlers"
import { getFollowingTeams } from "../../utils/mongodb/getTeams"
import TeamContent from "../../components/teams/TeamContent"

export default function Index({teamList}: {teamList?: teamsType[]}){
    const [searchTerm,setSearchTerm]=useState<string>("")
    const [search,setSearch]=useState(false)
    const [teams,setTeams]=useState<teamsType[]>([])
    const [completed,setCompleted]=useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(()=>{
        if(search) searchTeamsInfo()
    },[search])
    return(
        <div className="container mx-auto p-3">
            <div className="flex flex-col space-y-2">
                <SearchBar value={searchTerm} setValue={setSearchTerm} goSearch={setSearch} loading={loading}></SearchBar>
                {completed&&
                    <div className="flex items-center justify-center container bg-white rounded p-1 backdrop-blur-sm bg-opacity-70">
                        <TeamsPage teams={teams}></TeamsPage>
                    </div>
                }
                
            </div>
            <div className="flex flex-row flex-wrap p-2 items-start justify-between">
                {teamList?.map((team) => {
                    return(
                        <TeamContent key={team._id.toString()} team={team}/>
                    )
                })}
            </div>
        </div>
    )
    async function searchTeamsInfo() {
        setLoading(true)
        setSearch(false)
        const res = await fetch(`${process.env.appPath}/api/searchTeamsApi`,{
            method:'POST',
            body:JSON.stringify({term:searchTerm})
        })
        const result = await res.json()
        setTeams(result)
        setCompleted(true)
        setLoading(false)
    }
}

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({req}) {
        const userUid = req.session.user
        if(userUid && userUid.uid){
            const teams = await getFollowingTeams({uid: userUid.uid})
            if (teams){
                return {
                    props:{teamList: JSON.parse(JSON.stringify(teams))}
                }
            }else{
                return{
                    props:{teamList:[]}
                }
            }

        }else{
            return{
                props:{teamList: []}
            }
        }
    }
)
