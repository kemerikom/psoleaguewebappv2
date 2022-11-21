import Link from "next/link"
import { matchType } from "../typings"

export default function MatchResult({match}:{match:matchType}){
    return(
        <div className='flex flex-row items-center justify-center space-x-2 w-full'>
            <div className='flex flex-row items-center space-x-2'>
                <div className='flex w-16 aspect-square rounded-full'>
                    <img className='flex w-full aspect-square object-contain rounded-full' src='/teamlogo.png'></img>
                </div>
                <label className='flex space-x-2 items-center justify-center'>
                    <Link href={`/teams/${match.hometeamid}`} className='flex hover:underline text-xl'>{match.hometeamname}</Link>
                    <b className='text-3xl'>{match.hometeamscore}</b>
                </label>
            </div>
            <label className='text-3xl'><b>-</b></label>
            <div className='flex flex-row items-center space-x-2'>
                <label className='flex space-x-2 items-center justify-center'>
                    <b className='text-3xl'>{match.awayteamscore}</b>
                    <Link href={`/teams/${match.awayteamid}`} className='flex hover:underline text-xl'>{match.awayteamname}</Link>
                </label>
                <div className='flex w-16 aspect-square rounded-full'>
                    <img className='flex w-full aspect-square object-contain rounded-full' src='/teamlogo.png'></img>
                </div>
            </div>
        </div>
    )
}