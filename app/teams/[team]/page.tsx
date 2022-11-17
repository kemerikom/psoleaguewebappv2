import {leagueUrl} from '../../../utils/src/leagueUrl'
import PageView from './PageView'

type PageProps={
    params:{
        team:string
    }
}


async function getTeamInfo({team}:{team:string}){
    const res = await fetch(`${leagueUrl}/api/getTeamApi`,{
        method:'POST',
        body:JSON.stringify({teamId:team}),
        next:{revalidate:60}
    })
    const data = await res.json()
    return data
}

export default async function TeamPage({params:{team}}:PageProps) {
    const teamInfo= await getTeamInfo({team})
    return(
        <div className="flex w-full p-3">
            <PageView data={teamInfo}></PageView>
        </div>
    )
}