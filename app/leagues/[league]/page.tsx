import { leagueUrl } from "../../../utils/src/leagueUrl"
import PageView from './PageView'
import {leagueName} from '../../../typings'
import LeagueHeader from './LeagueHeader'

type PageProps={
    params:{
        league:string
    }
}

async function getLeagueInfo({league}:{league:string}) {
    const res = await fetch(`${leagueUrl}/api/getLeagueApi`,{
        method:'POST',
        body:league,
        next:{revalidate:60}
    })
    const data =await res.json()
    return data
}




export default async function LeaguePage({params:{league}}:PageProps){
    const leagueInfo:leagueName= await getLeagueInfo({league})
    const {name,logo}=leagueInfo
    return(
        <div className="flex flex-col lg:w-[600px] xl:w-[800px] 2xl:w-[1000px] bg-white backdrop-blur-sm bg-opacity-70 rounded">
            <LeagueHeader name={name} logo={logo}></LeagueHeader>
            <hr/>
            <PageView data={leagueInfo}></PageView>
        </div>
    )
}

export async function generateStaticParams() {
    const res = await fetch(`${leagueUrl}/api/getLeagueIds`)
    const result = await res.json()
    const paths= result.map((path:any)=>{
        return{
            league:path.id.toString()
        }
    })
    return paths
}