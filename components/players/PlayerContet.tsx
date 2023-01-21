import Link from "next/link"
import ReactCountryFlag from "react-country-flag"
import { IoPersonCircle } from "react-icons/io5"
import { playerType } from "../../typings"


export default function PlayerContent({player}: {player: playerType}){
    return(
        <Link href={`/players/${player._id.toString()}`} className="flex flex-col max-w-xs w-full p-2 rounded bg-white backdrop-blur-sm bg-opacity-70 m-2 items-center">
            {player.avatar && 
                <div className="flex w-30 h-30 rounded-full items-center justify-center">
                    <img src={player.avatar.large} className="flex w-32 h-32 rounded-full object-contain"></img>
                </div>
            }
            {!player.avatar && 
                <div className="flex w-32 h-32 rounded-full items-center justify-center">
                    <IoPersonCircle className="text-9xl"/>
                </div>
            }
            <h3 className="text-xl line-clamp-1 cursor-pointer hover:underline">{player.username}</h3>
            <div className="flex flex-row w-full items-center">
                <div>
                    <ReactCountryFlag countryCode={player.country || 'XX'} svg className="text-4xl"/>
                </div>
                <div className="flex w-10 h-10 aspect-square ml-auto bg-green-800 text-white rounded-full items-center justify-center text-xl mx-2">
                    {player.mainpos}
                </div>
                <div className="flex w-10 h-10 aspect-square bg-green-800 text-white rounded-full items-center justify-center text-xl mx-2">
                    {player.secondpos}
                </div>
            </div>
        </Link>
    )
}