import Link from "next/link"
import { leagueName, leagueType } from "../../typings"
import ReactCountryFlag from "react-country-flag"

export default function LeagueCard({data}:{data:leagueType}){
    return(
        <Link href={`/leagues/${data._id}`} className={`flex items-col rounded p-2 cursor-pointer w-64 gap-x-1`}
        style={{background:`linear-gradient(45deg, ${data.color1} 0%, ${data.color2} 100%)`}}
        >
            <div className={`flex items-center justify-center aspect-square w-16 rounded-full `}>
                <img src='/teamlogo.png' className="flex aspect-square w-full object-contain rounded-full"></img>
            </div>
            <div className="flex flex-col flex-1 items-start justify-center bg-white backdrop-blur-sm bg-opacity-50 p-1 rounded">
                <h3 className="font-medium whitespace-nowrap cursor-pointer">{data.name}</h3>
                <ReactCountryFlag countryCode={data.region||''} svg style={{width:'30px'}}/>
            </div>
        </Link>
    )
}