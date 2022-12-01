'use client'
import ReactCountryFlag from "react-country-flag";
import Link from "next/link";
import { useEffect,useContext,useState } from "react";
import { SiteContext } from "../../context/SiteContext";
import { playerType,teamsType } from "../../typings";


export default function Header(){
    const siteData:any= useContext(SiteContext)
    const {uid} = siteData
    const [user,setUser]=useState<playerType|null>(null)
    const [userTeam,setUserTeam]=useState<teamsType|null>(null)
    useEffect(()=>{
        if(uid!=null)getUserData()
    },[uid])
    useEffect(()=>{
        if(user!=null&&user.teamid)getTeamData()
    },[user])
    if(user!=null){
    return(
        <div className="flex flex-row w-full space-x-2 bg-white backdrop-blur-sm bg-opacity-70 p-2 rounded">
            <div className="flex items-center justify-center w-32 aspect-square rounded-full">
                <img src='/teamlogo.png' className="w-full aspect-square rounded-full object-contain"></img>
            </div>
            <div className="flex flex-col space-y-1">
                <h1>
                    {user?.username}
                </h1>
                <ReactCountryFlag countryCode={user.country} svg title={user.country} style={{width:'30px'}}/>
                <Link href={`/teams/${userTeam?._id}`} className='hover:underline transition-all'>
                    {userTeam?.name}
                </Link>
                <div className="flex flex-row space-x-2">
                    <div className=" flex w-6 aspect-square rounded-full bg-green-600 items-center justify-center text-xs text-white cursor-default">
                        <label>{user?.mainpos}</label>
                    </div>
                    <div className=" flex w-6 aspect-square rounded-full bg-green-600 items-center justify-center text-xs text-white">
                        <label>{user?.secondpos}</label>
                    </div>
                </div>
            </div>
        </div>
    )}else{
        return(
            <div>Loading</div>
        )
    }
    async function getUserData() {
        fetch(`${process.env.appPath}/api/getUserByUidApi`,{
            method:'POST',
            body:JSON.stringify({uid})
        })
        .then((res)=>{
            const resData= res.json()
            return resData
        })
        .then((data)=>{
            setUser(data)
        })
        getTeamData()
    }
    async function getTeamData() {
        fetch(`${process.env.appPath}/api/getTeamApi`,{
            method:'POST',
            body:JSON.stringify({teamId:user?.teamid})
        })
        .then((res)=>{
            const resData = res.json()
            return resData
        })
        .then((data)=>{
            setUserTeam(data)
        })

    }
}