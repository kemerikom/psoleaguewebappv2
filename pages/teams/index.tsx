import SearchBar from "../../components/SearchBar"
import {useState,useEffect} from 'react'
import { teamsType } from "../../typings"
import TeamsPage from "../../components/TeamsPage"


export default function Index(){
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