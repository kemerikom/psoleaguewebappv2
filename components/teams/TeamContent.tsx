import { teamsType } from "../../typings";
import Link from "next/link";
import { IoPeopleCircle } from "react-icons/io5";
import ReactCountryFlag from "react-country-flag";


export default function TeamContent({team}: {team: teamsType}){
    return(
        <Link href={`/teams/${team._id.toString()}`} className="flex flex-col max-w-xs w-full p-2 rounded bg-white backdrop-blur-sm bg-opacity-70 m-2 items-center">
            {team.logo && 
                <div className="flex w-30 h-30 rounded-full items-center justify-center">
                    <img src={`${process.env.storagePath}/teamlogos/${team.logo}`} className="flex w-32 h-32 rounded-full object-contain"></img>
                </div>
            }
            {!team.logo && 
                <div className="flex w-32 h-32 rounded-full items-center justify-center">
                    <IoPeopleCircle className="text-9xl"/>
                </div>
            }
            <h3 className="text-xl line-clamp-1 cursor-pointer hover:underline">{team.name}</h3>
            <div className="flex flex-row w-full items-center">
                <div>
                    <ReactCountryFlag countryCode={team.origin || 'XX'} svg className="text-4xl"/>
                </div>
            </div>
        </Link>
    )
}