import { transferType } from "../../typings";
import Link from "next/link";
import {BiTransferAlt} from 'react-icons/bi'



{/* <div className="flex flex-row w-full items-center justify-center space-x-2 hover:bg-blue-600 hover:text-white bg-white rounded transition-all">
    <div className="flex flex-1 justify-end">
        {transfer.from?.teamid!="free"&&
            <Link href={`/teams/${transfer.from?.teamid}`} className="flex link transition-all">{transfer.from?.teamname}</Link>
        }
        {transfer.from?.teamid=="free"&&
            <label className="flex">Free</label>
        }
    </div>
    <div className="flex flex-1 flex-col items-center justify-center">
        <BiTransferAlt className="text-lg"/>
        <label className="text-center">{new Date(transfer.datetime).toLocaleString()}</label>
    </div>
    <div className="flex flex-1 justify-start">
        {transfer.to?.teamid!="free"&&
            <Link href={`/teams/${transfer.to?.teamid}`} className="flex link transition-all">{transfer.to?.teamname}</Link>
        }
        {transfer.to?.teamid=="free"&&
            <label className="flex">Free</label>
        }
    </div>
</div> */}

export default function Transfer({transfer}:{transfer:transferType}){
    return(
        <div>
            Transfer
        </div>

        
    )
}