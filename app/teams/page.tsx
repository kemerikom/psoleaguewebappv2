'use client'
import SearchBar from "../../components/SearchBar"
import { useState,useEffect } from "react"
import { leagueUrl } from "../../utils/src/leagueUrl"
import { teamsType } from "../../typings"
import TeamsPage from "../../components/TeamsPage"

export default function Teams(){
    const [searchTerm,setSearchTerm]=useState<string>("")
    const [search,setSearch]=useState(false)
    const [teams,setTeams]=useState<teamsType[]>([])
    const [completed,setCompleted]=useState<boolean>(false)
    useEffect(()=>{
        if(search) searchTeamsInfo()
    },[search])
    return(
        <div className="flex flex-col space-y-2">
            <SearchBar value={searchTerm} setValue={setSearchTerm} goSearch={setSearch} ></SearchBar>
            {completed&&
                <div className="flex container bg-white rounded p-1 backdrop-blur-sm bg-opacity-70">
                    <TeamsPage teams={teams}></TeamsPage>
                </div>
            }

        </div>
    )
    async function searchTeamsInfo() {
        setSearch(false)
        fetch(`${leagueUrl}/api/searchTeamsApi`,{
            method:'POST',
            body:JSON.stringify({term:searchTerm})
        })
        .then((res)=>{
            const dataRes=res.json()
            return dataRes
        })
        .then((data)=>{
            setTeams(data)
            setCompleted(true)
        })
    }
}