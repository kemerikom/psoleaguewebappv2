import { transferType } from "../../typings";
import Link from "next/link";
import {BiTransferAlt} from 'react-icons/bi'

export default function Transfer({data}:{data:transferType}){
    return(
        <div className="flex flex-row w-full items-center justify-center space-x-2 hover:bg-blue-300 rounded transition-all">
            <div className="flex flex-1 justify-end">
                {data.from?.teamid!="free"&&
                    <Link href={`/teams/${data.from?.teamid}`} className="flex hover:underline transition-all">{data.from?.teamname}</Link>
                }
                {data.from?.teamid=="free"&&
                    <label className="flex">Free</label>
                }
            </div>
            <div className="flex flex-1 flex-col items-center justify-center">
                <BiTransferAlt className="text-lg"/>
                <label className="text-center">{new Date(data.datetime).toLocaleString()}</label>
            </div>
            <div className="flex flex-1 justify-start">
                {data.to?.teamid!="free"&&
                    <Link href={`/teams/${data.to?.teamid}`} className="flex hover:underline transition-all">{data.to?.teamname}</Link>
                }
                {data.to?.teamid=="free"&&
                    <label className="flex">Free</label>
                }
            </div>
        </div>
    )
}