'use client'
import SearchBar from "../../components/SearchBar"
import { useState,useEffect, Dispatch, KeyboardEvent, SetStateAction } from "react"
import { leagueUrl } from "../../utils/src/leagueUrl"

export default function Teams(){
    const [searchTerm,setSearchTerm]=useState<string>("")
    const [search,setSearch]=useState(false)
    useEffect(()=>{
        if(search) searchTeamsInfo()
    },[search])
    return(
        <div className="flex">
            <SearchBar value={searchTerm} setValue={setSearchTerm} goSearch={setSearch} ></SearchBar>
        </div>
    )
    async function searchTeamsInfo() {
        setSearch(false)
        console.log('searching',search)
        fetch(`${leagueUrl}/api/searchTeamsApi`,{
            method:'POST',
            body:JSON.stringify({term:searchTerm})
        })
        .then((res)=>{
            const dataRes=res.json()
            return dataRes
        })
        .then((data)=>{
            console.log(data)
        })
    }
}