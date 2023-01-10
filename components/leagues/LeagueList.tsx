import { leagueType } from "../../typings";
import LeagueCard from "./LeagueCard";


export default function LeagueList({leagues}:{leagues:leagueType[]}){
    return(
        <div className='flex flex-col p-2 mx-2 rounded bg-white backdrop-blur-sm bg-opacity-70 gap-y-2 overflow-y-auto flex-shrink-0'>
            <h2 className='text-center font-medium'>Official Leagues</h2>
            <hr/>
            {leagues.map((league)=>{
                return(
                    <LeagueCard key={league.name} data={league}/>
                )
            })}
            <hr/>
            <h2 className='text-center font-medium'>Unofficial Leagues</h2>
            <hr/>
        </div>

    )
}