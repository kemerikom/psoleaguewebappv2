import { leagueUrl } from "../../../utils/src/leagueUrl"
import PageView from "./PageView"


type PageProps={
    params:{
        player:string
    }
}

async function getPlayerInfo({playerId}:{playerId:string}) {
    const res = await fetch(`${leagueUrl}/api/getPlayerApi`,{
        method:'POST',
        body:JSON.stringify({playerId}),
        next:{revalidate:60}
    })
    const data= await res.json()
    return data
}


export default async function Page({params:{player}}:PageProps){
    const playerInfo= await getPlayerInfo({playerId:player})
    return(
        <div>
            <PageView data={playerInfo}/>
        </div>
    )
}