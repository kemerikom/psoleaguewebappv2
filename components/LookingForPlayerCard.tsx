import { IoPeopleCircle } from "react-icons/io5";
import { lookingForPlayerType } from "../typings";
import Link from "next/link";



export default function LookingForPlayerCard({data}: {data: lookingForPlayerType}) {
    return (
        <Link href={`/teams/${data.teamid}`} className="flex flex-row bg-white rounded p-2 hover:bg-blue-600 hover:text-white transition-all">
            {!data.teamlogo && 
                <div className="flex items-center justify-center h-16 w-16 aspect-square rounded-full">
                    <IoPeopleCircle className="text-9xl text-blue-600"/>
                </div>
            }
            {data.teamlogo && 
                <div className="flex items-center justify-center h-16 w-16 aspect-square rounded-full">
                    <img src={`${process.env.storagePath}/teamlogos/${data.teamlogo}`}></img>
                </div>
            }
            <div className="flex flex-col">
                <label className='cursor-pointer hover:underline'>{data.teamname}</label>
                <div className="flex flex-row flex-wrap items-center">
                    {data.positions.map((pos) => {
                        return(
                            <div key={pos} className="flex items-center h-8 w-8 aspect-square m-1 justify-center text-center bg-green-600 rounded-full text-white text-sm">
                                {pos}
                            </div>
                        )
                    })}
                </div>
            </div>
        </Link>
    )
}