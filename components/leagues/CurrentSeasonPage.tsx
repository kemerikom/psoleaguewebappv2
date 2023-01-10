import { seasonTableType,tablePointsType,tableScheduleType,tableTopGoalsType,tableTopAssistsType,tableTopSavesType } from "../../typings";
import { useState, useEffect } from "react";
import SeasonTab from "./SeasonTab";


export default function CurrentSeasonPage({seasonId}:{seasonId:string}){
    useEffect(()=>{
        if(seasonTable.length==0) getTableData()
    },[])
    const [seasonTable,setSeasonTable]=useState([])
    const [teamNames,setTeamNames]=useState([])
    const [points,setPoinst]=useState<tablePointsType[]>([])
    const [schedule,setSchedule]=useState<tableScheduleType[]>([])
    const [topGoals,setTopGoals]=useState<tableTopGoalsType[]>([])
    const [topAssists,setTopAssists]=useState<tableTopAssistsType[]>([])
    const [topSaves,setTopSaves]=useState<tableTopSavesType[]>([])
    return(
        <div className='flex flex-col space-y-2 items-center justify-center w-full p-2'>
            <SeasonTab
            points={points}
            schedule={schedule}
            topGoals={topGoals}
            topAssists={topAssists}
            topSaves={topSaves}
            />
        </div>
    )
    function getTableData() {
        fetch(`${process.env.appPath}/api/getTableApi`,{
            method:'POST',
            body:JSON.stringify({seasonId})
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            setSeasonTable(data)
            setTeamNames(data.teams)
            setPoinst(data.points)
            setSchedule(data.schedule)
            setTopGoals(data.topplayers.topgoals)
            setTopAssists(data.topplayers.topassists)
            setTopSaves(data.topplayers.topsaves)
        })
    }
}