import LeagueCard from './LeagueCard'
import {getLeagues} from '../../utils/mongodb/getLeagues'
import {use} from 'react'

async function getLeaguesData(){
    const res= await getLeagues()
    const leagueNames= res.map((league)=>{
        return{
            _id:league._id.toString(),
            name:league.name,
            color1:league.color1,
            color2:league.color2,
            fontcolor:league.fontcolor,
            official:league.official,
            logo:league.logo,
            teams:league.teams,
            admins:league.admins,
            refrees:league.refrees
        }
    })
    return leagueNames
}

const ln=getLeaguesData()


export default function LeagueList(){
    const leagueNames=use(ln)
    return(
        <div className='flex flex-col p-2 mx-2 rounded bg-white backdrop-blur-sm bg-opacity-70 gap-y-2 overflow-y-auto flex-shrink-0'>
            <h2 className='text-center font-medium'>Official Leagues</h2>
            {/* <hr/>
            {leagueNames.map((league)=>{
                return(
                    <LeagueCard key={league.name} data={league}/>
                )
            })}
            <hr/> */}
            <h2 className='text-center font-medium'>Unofficial Leagues</h2>
            <hr/>
        </div>
    )
}



