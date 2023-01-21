import SearchBar from "../../components/SearchBar"
import { useState,useEffect } from "react"
import { playerType } from "../../typings"
import Link from "next/link"
import ReactCountryFlag from "react-country-flag"
import { getFollowingPlayers } from "../../utils/mongodb/getUsers"
import { withSessionSsr } from "../../utils/src/ironSessionHandlers"
import PlayerContent from "../../components/players/PlayerContet"

export default function Index({playerList}: {playerList: playerType[]}){
    const [searchTerm,setSearchTerm]=useState<string>("")
    const [search,setSearch]=useState(false)
    const [players,setPlayers]=useState<playerType[]>([])
    const [completed,setCompleted]=useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(()=>{
        if(search) searchPlayersInfo()
    },[search])
    return(
        <div className="container mx-auto p-3">
            <div className="flex flex-col space-y-2">
                <SearchBar value={searchTerm} setValue={setSearchTerm} goSearch={setSearch} loading={loading}></SearchBar>
                {completed&&
                    <div className="flex items-center justify-center container bg-white rounded p-1 backdrop-blur-sm bg-opacity-70 flex-wrap">
                        {players.map((player)=>{
                            return(
                                <Link
                                key={player._id.toString()}
                                href={`/players/${player._id.toString()}`}
                                className='flex p-2 rounded bg-blue-600 text-white m-1 space-x-2 items-center font-medium hover:bg-blue-800 transition-all'>
                                    <div className="flex h-10 w-10 aspect-square rounded-full">
                                        <img src={player.avatar?.medium||'/defaultAvatar.svg'} className="rounded-full object-contain"></img>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="cursor-pointer">{player.username}</label>
                                        
                                        <div className="flex flex-row space-x-1 items-center">
                                            <ReactCountryFlag countryCode={player.country} svg/>
                                            <div className="flex h6 w-6 aspect-square rounded-full bg-green-800 font-normal text-sm items-center justify-center">
                                                {player.mainpos}
                                            </div>
                                            <div className="flex h6 w-6 aspect-square rounded-full bg-green-800 font-normal text-sm items-center justify-center">
                                                {player.secondpos}
                                            </div>
                                        </div>
                                    </div>
                                    
                                </Link>
                            )
                        })}
                    </div>
                }
                <div className="flex flex-row flex-wrap p-2 items-start justify-between">
                    {playerList?.map((player) => {
                        return(
                            <PlayerContent key={player._id.toString()} player={player}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
    async function searchPlayersInfo() {
        if(searchTerm.length>=2){
            setLoading(true)
            setSearch(false)
            const res = await fetch(`${process.env.appPath}/api/searchPlayersApi`,{
                method:'POST',
                body:JSON.stringify({term:searchTerm})
            })
            const result = await res.json()
            setPlayers(result)
            setCompleted(true)
            setLoading(false)
        }

    }
}


export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({req}) {
        const userUid = req.session.user
        if(userUid && userUid.uid){
            const players = await getFollowingPlayers({uid: userUid.uid})
            if (players){
                return {
                    props:{playerList: players}
                }
            }else{
                return{
                    props:{playerList:[]}
                }
            }

        }else{
            return{
                props:{playerList:[]}
            }
        }
    }
)