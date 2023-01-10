import { transferType } from "../../typings"
import Transfer from "./Transfer"

export default function TeamHistory({transfers}:{transfers:transferType[]}){
    return(
        <div className='flex flex-col space-y-2 w-full items-center justify-center'>
            {transfers.sort((a,b)=>a.datetime-b.datetime).map((transfer:transferType)=>{
                return(
                    <Transfer key={transfer._id} data={transfer}/>
                )
            })}
        </div>
    )
}