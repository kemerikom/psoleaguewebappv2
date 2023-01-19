import { leagueType, seasonNameType, seasonTableType } from "../../typings"
import { getLeagueIds,getLeague } from "../../utils/mongodb/getLeagues"
import LeagueHeader from "../../components/leagues/LeagueHeader"
import { Tab,Disclosure } from "@headlessui/react"
import { IoChevronDown } from "react-icons/io5"
import LeaguePage from "../../components/leagues/LeaguePage"
import PreviousSeasonPage from "../../components/leagues/PreviousSeasonPage"
import CurrentSeasonPage from "../../components/leagues/CurrentSeasonPage"
import TeamsPage from "../../components/TeamsPage"
import { getCurrentSeasons, getSeasons } from '../../utils/mongodb/getSeasons'
import { getLeaguePreviousTables } from "../../utils/mongodb/getTables"

export default function League({league,currentSeasons,previousSeasons}:{league:leagueType,currentSeasons:seasonNameType[],previousSeasons:seasonTableType[]}){
    return(
        <div className="flex flex-col max-w-5xl w-full mx-auto my-3 p-3 bg-white backdrop-blur-sm bg-opacity-70 rounded">
            <LeagueHeader name={league.name} logo={league.logo}/>
            <hr/>
            <div className="flex flex-1 !w-full p-2 rounded">
                <Tab.Group as={'div'} className='flex flex-col w-full space-y-2' defaultIndex={0}>
                    <Tab.List as={'div'} className='flex flex-row w-full bg-white p-1 rounded space-x-2 items-center justify-between'>
                        <Tab as='div' className={'outline-none flex flex-1 items-center justify-center'}>
                            {({selected})=>(
                                <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} w-full transition-all p-2 rounded`}>League</button>
                            )}
                        </Tab>
                        <Tab as='div' className={'outline-none flex flex-1 items-center justify-center'}>
                            {({selected})=>(
                                <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} w-full transition-all p-2 rounded`}>Current Season</button>
                            )}
                        </Tab>
                        <Tab as='div' className={'outline-none flex flex-1 items-center justify-center'}>
                            {({selected})=>(
                                <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} w-full transition-all p-2 rounded`}>Previous Seasons</button>
                            )}
                        </Tab>
                        <Tab as='div' className={'outline-none flex flex-1 items-center justify-center'}>
                            {({selected})=>(
                                <button className={`${selected?'bg-blue-600 text-white':'bg-white text-black'} w-full transition-all p-2 rounded`}>Teams</button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels as='div' className={'overflow-auto w-full'}>
                        <Tab.Panel>
                            <LeaguePage></LeaguePage>
                        </Tab.Panel>
                        <Tab.Panel className={'flex flex-col bg-white rounded p-2'}>
                            {currentSeasons?.map((season)=>{
                                return(
                                <Disclosure as='div' key={season._id} className={'w-full items-center justify-center'}>
                                    {({open})=>(
                                        <div className="flex flex-col w-full space-y-2">
                                            <Disclosure.Button as='button' className={`${open?'bg-blue-600 text-white':'bg-blue-100 text-black'} flex flex-row items-center justify-between w-full p-1 rounded transition-all outline-none`}>
                                                {season.seasonName}
                                                <IoChevronDown className={`text-2xl ${open?'rotate-180':'rotate-0'} transition-all`}></IoChevronDown>
                                            </Disclosure.Button>
                                            <Disclosure.Panel as='div' className={`flex bg-blue-100 p-1 rounded transition-all`}>
                                                <CurrentSeasonPage seasonId={season._id.toString()}></CurrentSeasonPage>
                                            </Disclosure.Panel>
                                        </div>
                                    )}
                                </Disclosure>
                                )
                            })}
                        </Tab.Panel>
                        <Tab.Panel as='div' className={'flex flex-col bg-white rounded p-2'}>
                            {previousSeasons?.map((season)=>{
                                return(
                                <Disclosure as='div' key={season._id} className={'w-full items-center justify-center'}>
                                    {({open})=>(
                                        <div className="flex flex-col w-full space-y-2">
                                            <Disclosure.Button as='button' className={`${open?'bg-blue-600 text-white':'bg-blue-100 text-black'} flex flex-row items-center justify-between w-full p-1 rounded transition-all outline-none`}>
                                                {season.seasonname}
                                                <IoChevronDown className={`text-2xl ${open?'rotate-180':'rotate-0'} transition-all`}></IoChevronDown>
                                            </Disclosure.Button>
                                            <Disclosure.Panel as='div' className={`flex bg-blue-100 p-1 rounded transition-all`}>
                                                <PreviousSeasonPage season={season}></PreviousSeasonPage>
                                            </Disclosure.Panel>
                                        </div>
                                    )}
                                </Disclosure>
                                )
                            })}
                        </Tab.Panel>
                        <Tab.Panel as='div' className={'flex flex-col bg-white rounded p-2'}>
                            {/* <TeamsPage teams={league.teams}></TeamsPage> */}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>

        </div>
    )
}


export async function getStaticProps({params}:{params:{league:string}}) {
    const resLeague = await getLeague({league:params.league})
    const league = JSON.parse(JSON.stringify(resLeague))
    const resCurrentSeason = await getCurrentSeasons({leagueId:league._id.toString()})
    const currentSeasons = JSON.parse(JSON.stringify(resCurrentSeason))
    const resSeasons = await getLeaguePreviousTables({leagueId:league._id.toString()})
    const previousSeasons = JSON.parse(JSON.stringify(resSeasons))
    return{
        props:{league,currentSeasons,previousSeasons},
        revalidate: 30
    }
}


export async function getStaticPaths() {
    const resultLeague = await getLeagueIds()
    const paths=resultLeague.map((league)=>{
        return{
            params:{league:league._id.toString()}
        }
    })
    return{
        paths,
        fallback:'blocking'
    }
}