import { GetServerSidePropsContext } from "next"
import Link from "next/link"
import StatsPlayer from "../../../components/matches/StatsPlayer"
import StatsRow from "../../../components/matches/StatsRow"
import { matchStatsType } from "../../../typings"
import { getMatchById } from "../../../utils/mongodb/getMatches"





export default function MatchId({match}: {match: matchStatsType}) {
    return(
        <div className="flex flex-col items-center max-w-3xl w-full mx-auto mt-3 p-2 bg-white backdrop-blur-sm bg-opacity-70 rounded space-y-2">
            <Link href={`/leagues/${match.leagueid}`} className='link'>
                <h1 className="cursor-pointer">{match.leaguename}</h1>
            </Link>
            <div className="flex flex-row w-full">
                <div className="flex flex-col flex-1 flex-shrink-0 items-center space-y-2">
                    <Link href={`/teams/${match.hometeam.id}`} className='link text-xl font-semibold'>{match.hometeam.teamname}</Link>
                    <div className="flex w-32 h-32 aspect-square rounded-full items-center justify-center">
                        <img src={`${process.env.storagePath}/teamlogos/${match.hometeam.logo}`} className='flex w-32 h-32 aspect-square rounded-full'></img>
                    </div>
                </div>
                <div className="flex flex-col flex-1 flex-shrink-0 items-center space-y-2">
                    <Link href={`/teams/${match.awayteam.id}`} className='link text-xl font-semibold'>{match.hometeam.teamname}</Link>
                    <div className="flex w-32 h-32 aspect-square rounded-full items-center justify-center">
                        <img src={`${process.env.storagePath}/teamlogos/${match.awayteam.logo}`} className='flex w-32 h-32 aspect-square rounded-full'></img>
                    </div>
                </div>
            </div>
            <StatsRow title={'Goals'} homeScore={match.homestats.goals || 0} awayScore={match.awaystats.goals || 0}/>
            <StatsRow title={'Assists'} homeScore={match.homestats.assists || 0} awayScore={match.awaystats.assists || 0}/>
            <StatsRow title={'Passes'} homeScore={match.homestats.passes || 0} awayScore={match.awaystats.passes || 0}/>
            <StatsRow title={'TKLs/INTs'} homeScore={match.homestats.tkls || 0} awayScore={match.awaystats.tkls || 0}/>
            <StatsRow title={'Positions'} homeScore={match.homestats.positions || 50} awayScore={match.awaystats.positions || 50}/>
            <StatsRow title={'Corner Kicks'} homeScore={match.homestats.corners || 0} awayScore={match.awaystats.corners || 0}/>
            <StatsRow title={'Throw Ins'} homeScore={match.homestats.thrown || 0} awayScore={match.awaystats.thrown || 0}/>
            <StatsRow title={'Penalties'} homeScore={match.homestats.penalties || 0} awayScore={match.awaystats.penalties || 0}/>
            <StatsRow title={'Foul'} homeScore={match.homestats.fouls || 0} awayScore={match.awaystats.fouls || 0}/>
            <StatsRow title={'Yellow Cards'} homeScore={match.homestats.yellows || 0} awayScore={match.awaystats.yellows || 0}/>
            <StatsRow title={'Red Cards'} homeScore={match.homestats.reds || 0} awayScore={match.awaystats.reds || 0}/>
            <div className="flex flex-row w-full space-x-2">
                {match.homeplayerstats && 
                    <div className="flex flex-col flex-1 space-y-2">
                        {match.homeplayerstats.map((stats) => {
                            return(
                                <StatsPlayer key={`${stats.id}stats`} home={true} stats={stats}/>
                            )
                        })}
                    </div>
                }
                {match.awayplayerstats && 
                    <div className="flex flex-col flex-1 space-y-2">
                        {match.awayplayerstats.map((stats) => {
                            return(
                                <StatsPlayer key={`${stats.id}stats`} home={false} stats={stats}/>
                            )
                        })}
                    </div>
                }
                
            </div>

        </div>
    )
}





export async function getStaticProps({params}: {params: {matchId: string}}) {
    const matchId = params.matchId
    const match = await getMatchById({matchId})
    if (!match) {
        return {
            notFound: true
        }
    }else {
        return {
            props: {match: JSON.parse(JSON.stringify(match))}
        }
    }

}



export async function getStaticPaths() {
    return{
        paths: [],
        fallback:'blocking'
    }
}