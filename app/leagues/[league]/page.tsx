'use client'
import { leagueUrl } from "../../../utils/src/leagueUrl"
import { leagueIdType } from "../../../typings"

export default function LeaguePage(){
    return(
        <div>
            League page asdasd
        </div>
    )
}

export async function generateStaticParams() {
    const data = await fetch(`${leagueUrl}/api/getLeagueIds`)
    const result:leagueIdType[]= await data.json()
    return result.map((r)=>{
        league:r._id.toString()
    })
}