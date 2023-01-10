import LeagueList from "../../components/leagues/LeagueList"
import { leagueType } from "../../typings"
import { getLeagues } from "../../utils/mongodb/getLeagues"

export default function Index({leagues}:{leagues:leagueType[]}){
    return(
        <div className='flex flex-row container p-3 items-start'>
            <LeagueList leagues={leagues}/>
        </div>
    )
}


export async function getStaticProps() {
    const resLeagues= await getLeagues()
    const leagues=JSON.parse(JSON.stringify(resLeagues))
    return{
        props:{leagues},
        revalidate:60
    }
}