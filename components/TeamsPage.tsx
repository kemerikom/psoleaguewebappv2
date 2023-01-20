import Link from "next/link"
import { IoPeopleCircle } from "react-icons/io5"
import { teamsType } from "../typings"

export default function TeamsPage({teams}:{teams:teamsType[]}){
    return(
        <div className="flex flex-row flex-wrap justify-center">
            {teams?.map((team)=>{
                let bs= Math.floor(Math.random()*(350))+150
                return(
                <div key={team.name} id='teamBack' className="flex flex-row flex-shrink-0 m-1 p-2 rounded cursor-pointer transition-all">
                <style jsx>
                    {`
                        #teamBack{
                            background: linear-gradient(-45deg, ${team.color1}, ${team.color2},${team.color1}, ${team.color2});
                            background-size: ${bs}% ${bs}%;
                            animation: gradient 5s ease infinite;
                        }
                        @keyframes gradient{
                            0% {
                                background-position: 0% 50%;
                            }
                            50% {
                                background-position: 100% 50%;
                            }
                            100% {
                                background-position: 0% 50%;
                            }
                        }
                    `}
                </style>
                    <Link href={`/teams/${team._id}`} className="flex flex-row space-x-2 items-center">
                        <div className="flex items-center w-16 h-16 aspect-square rounded-full">
                            {team.logo && 
                                <img className="rounded-full" src={`${process.env.storagePath}/teamlogos/${team.logo}`}></img>
                            }
                            {!team.logo &&
                            <div className="flex w-16 h-16 items-center justify-center rounded-full"
                            style={{backgroundColor: team.color1}}
                            >
                                <IoPeopleCircle className="text-4xl"
                                style={{color: team.color2}}
                                />
                            </div>
                            }
                        </div>
                        <div className="flex flex-col cursor-pointer">
                            <h3 className="cursor-pointer"
                            style={{color:team.fontcolor}}
                            >
                                <b>Team Name:</b> {team.name}
                            </h3>
                            <h3 className="cursor-pointer"
                            style={{color:team.fontcolor}}
                            >
                                <b>Team Tag:</b> {team.shortname}
                            </h3>
                        </div>
                    </Link>
                </div>
                )
            })}
        </div>
    )
}