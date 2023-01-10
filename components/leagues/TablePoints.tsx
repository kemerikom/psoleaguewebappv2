import Link from "next/link"
import { tablePointsType } from "../../typings"

export default function TablePoints({points}:{points:tablePointsType[]}){
    return(
        <table className='min-w-full w-full text-ellipsis overflow-hidden whitespace-nowrap table-fixed cursor-default items-center text-center'>
            <tbody>
                <tr className='w-full'>
                    <th className='border border-black whitespace-nowrap'>#</th>
                    <th className='border bg-blue-300 border-black whitespace-nowrap'>Team Name</th>
                    <th className='border border-black whitespace-nowrap'>Point</th>
                    <th className='border bg-blue-300 border-black whitespace-nowrap'>Win</th>
                    <th className='border border-black whitespace-nowrap'>Draw</th>
                    <th className='border bg-blue-300 border-black whitespace-nowrap'>Lose</th>
                    <th className='border border-black whitespace-nowrap'>Goals</th>
                    <th className='border bg-blue-300 border-black whitespace-nowrap'>Against</th>
                    <th className='border border-black whitespace-nowrap'>Diff.</th>
                </tr>
                {points?.sort((a,b)=>b.point-a.point||b.diff-a.diff).map((point:tablePointsType,index)=>{
                return(
                    <tr key={point.teamname} className='w-full group'>
                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all border-black whitespace-nowrap font-normal items-center justify-center text-center'>{index+1}</td>
                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all bg-blue-300 border-black whitespace-nowrap font-normal items-center justify-center text-center'>
                            <Link href={`/teams/${point.teamname}`} className='hover:font-semibold'>{point.teamname}</Link>
                        </td>
                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all border-black whitespace-nowrap font-normal items-center justify-center text-center'>{point.point}</td>
                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all bg-blue-300 border-black whitespace-nowrap font-normal items-center justify-center text-center'>{point.win}</td>
                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all border-black whitespace-nowrap font-normal items-center justify-center text-center'>{point.draw}</td>
                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all bg-blue-300 border-black whitespace-nowrap font-normal items-center justify-center text-center'>{point.lose}</td>
                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all border-black whitespace-nowrap font-normal items-center justify-center text-center'>{point.goals}</td>
                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all bg-blue-300 border-black whitespace-nowrap font-normal items-center justify-center text-center'>{point.agoals}</td>
                        <td className='border group-hover:bg-blue-600 group-hover:text-white transition-all border-black whitespace-nowrap font-normal items-center justify-center text-center'>{point.diff}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}