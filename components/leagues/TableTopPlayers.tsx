import Link from "next/link"
import { tableTopGoalsType,tableTopAssistsType,tableTopSavesType } from "../../typings";


export default function TableTopPlayers({dataGoals,dataAssists,dataSaves}:{dataGoals?:tableTopGoalsType[],dataAssists?:tableTopAssistsType[],dataSaves?:tableTopSavesType[]}){
    return(
        <table className='min-w-full table-fixed cursor-default items-center text-center'>
            <tbody>
                <tr>
                    <th className='border border-black whitespace-nowrap'>#</th>
                    <th className='border border-black whitespace-nowrap'>Player Name</th>
                    {dataGoals&&
                            <th className='border border-black whitespace-nowrap'>Total Goals</th>
                    }
                    {dataAssists&&
                            <th className='border border-black whitespace-nowrap'>Total Assists</th>
                    }
                    {dataSaves&&
                            <th className='border border-black whitespace-nowrap'>Total Saves</th>
                    }
                </tr>
                {dataGoals?.sort((a,b)=>b.goals-a.goals).map((goals,index)=>{
                    return(
                        <tr key={`${goals.playerid}saves`}>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} border border-black whitespace-nowrap`}>{index+1}</td>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} border border-black whitespace-nowrap`}>
                                <Link href={'/'} className='hover:font-semibold'>
                                    {goals.playername}
                                </Link>
                            </td>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} border border-black whitespace-nowrap`}>{goals.goals}</td>
                        </tr>
                    )
                })}
                {dataAssists?.sort((a,b)=>b.assists-a.assists).map((assists,index)=>{
                    return(
                        <tr key={`${assists.playerid}saves`}>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} border border-black whitespace-nowrap`}>{index+1}</td>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} border border-black whitespace-nowrap`}>
                                <Link href={'/'} className='hover:font-semibold'>
                                    {assists.playername}
                                </Link>
                            </td>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} border border-black whitespace-nowrap`}>{assists.assists}</td>
                        </tr>
                    )
                })}
                {dataSaves?.sort((a,b)=>b.saves-a.saves).map((saves,index)=>{
                    return(
                        <tr key={`${saves.playerid}saves`}>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} border border-black whitespace-nowrap`}>{index+1}</td>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} border border-black whitespace-nowrap`}>
                                <Link href={'/'} className='hover:font-semibold'>
                                    {saves.playername}
                                </Link>
                            </td>
                            <td className={`${(index+1)%2==0?'bg-blue-300':''} border border-black whitespace-nowrap`}>{saves.saves}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}