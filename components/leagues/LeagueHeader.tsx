import Link from "next/link"
import { IoCloseCircleOutline } from "react-icons/io5"


export default function LeagueHeader({name,logo}:{name:string,logo:string}){
    return(
        <div className="flex flex-row p-2 items-center justify-between space-x-2">
            <div className="flex items-center justify-center w-20 h-20 rounded-full" >
                <img className="rounded-full object-contain" src='/teamlogo.png'></img>
            </div>
            <h1>{name}</h1>
            <div className="flex items-center justify-center mb-auto w-8 h-8 rounded-full bg-blue-600">
                <Link href='/leagues'>
                    <IoCloseCircleOutline className="text-white text-2xl"></IoCloseCircleOutline>
                </Link>
            </div>
        </div>
    )
}