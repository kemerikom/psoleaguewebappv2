import Link from "next/link"
import { LookingForTeamType } from "../typings"

export default function LookingForTeam({data}: {data: LookingForTeamType}){
    return(
        <Link href={`/players/${data.userid.toString()}`} className='flex flex-row p-2 space-x-2 w-full rounded bg-white hover:bg-blue-600 hover:text-white transition-all items-center justify-between'>
            <img className='w-14 h-14 aspect-square rounded-full' src={data.avatar}></img>
            <label className='cursor-pointer link'>{data.username}</label>
            <div className='flex flex-col h-full sapce-y-2 items-center justify-between'>
                <div className='flex w-6 h-6 rounded-full bg-green-600 text-white text-sm items-center justify-center'>
                    {data.mainpos}
                </div>
                <div className='flex w-6 h-6 rounded-full bg-green-600 text-white text-sm items-center justify-center'>
                    {data.secpos}
                </div>
            </div>
        </Link>
    )
}