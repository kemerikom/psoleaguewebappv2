import Link from "next/link";
import { FaCrown } from "react-icons/fa";
import { IoBan } from "react-icons/io5";
import { userNameIdType } from "../../typings";



export default function PlayerList({players}:{players?:userNameIdType[]}){
    return(
        <div className="flex flex-col w-full mx-auto max-w-2xl p-2 bg-white rounded">
            {players&&players.map((player)=>{
                return(
                    <div key={player.id} className="flex h-10 flex-row group items-center justify-between w-full p-1 rounded hover:bg-blue-300 transition-all">
                        <Link href={`/players${player.id}`} className='link'>{player.username}</Link>
                        <div className="hidden invisible group-hover:flex group-hover:visible flex-row space-x-1 transition-all">
                            <button className="flex rounded bg-blue-600 hover:bg-blue-800 text-white py-1 px-2 space-x-1 font-medium transition-all">
                                <FaCrown className="text-2xl"/>
                                <label className="cursor-pointer">Co-Captain</label>
                            </button>
                            <button className="flex rounded bg-red-600 hover:bg-red-800 text-white py-1 px-2 space-x-1 font-medium transition-all">
                                <IoBan className="text-2xl"/>
                                <label className="cursor-pointer">Kick</label>
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}