import { transferType } from "../../../typings";
import {BiTransferAlt} from 'react-icons/bi'
import Link from "next/link";

export default function Transfer({data}:{data:transferType}){
    const date= new Date(data.datetime).toLocaleString()
    return(
        <div className="flex flex-row w-full items-center justify-center space-x-2 hover:bg-blue-300 rounded transition-all">
            <div className="flex flex-1 justify-end">
                {data.from?.id!="free"&&
                    <Link href={`/teams/${data.from?.id}`} className="flex hover:underline transition-all">{data.from?.teamname}</Link>
                }
                {data.from?.id=="free"&&
                    <label className="flex">Free</label>
                }
            </div>
            <div className="flex flex-1 flex-col items-center justify-center">
                <BiTransferAlt className="text-lg"/>
                <label className="text-center">{date}</label>
            </div>
            {/* <div className="flex flex-1 justify-start">
                {data.to.teamid!="free"&&
                    <Link href={`/teams/${data.to.teamid}`} className="flex hover:underline transition-all">{data.to.teamname}</Link>
                }
                {data.to.teamid=="free"&&
                    <label className="flex">Free</label>
                }
            </div> */}
        </div>
    )
}