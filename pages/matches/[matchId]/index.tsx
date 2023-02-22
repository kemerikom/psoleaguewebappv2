import Link from "next/link"
import StatsPlayer from "../../../components/matches/StatsPlayer"
import StatsRow from "../../../components/matches/StatsRow"





export default function MatchId() {
    return(
        <div className="flex flex-col items-center max-w-3xl w-full mx-auto mt-3 p-2 bg-white backdrop-blur-sm bg-opacity-70 rounded space-y-2">
            <Link href={`/`} className='link'>
                <h1 className="cursor-pointer">Türkiye 1. Ligi</h1>
            </Link>
            <div className="flex flex-row w-full">
                <div className="flex flex-col flex-1 flex-shrink-0 items-center space-y-2">
                    <Link href={`/`} className='link text-xl font-semibold'>LaSisX</Link>
                    <div className="flex w-32 h-32 aspect-square rounded-full items-center justify-center">
                        <img src={`/teamlogo.png`} className='flex w-32 h-32 aspect-square rounded-full'></img>
                    </div>
                </div>
                <div className="flex flex-col flex-1 flex-shrink-0 items-center space-y-2">
                    <Link href={`/`} className='link text-xl font-semibold'>Aedern</Link>
                    <div className="flex w-32 h-32 aspect-square rounded-full items-center justify-center">
                        <img src={`/teamlogo.png`} className='flex w-32 h-32 aspect-square rounded-full'></img>
                    </div>
                </div>
            </div>
            <StatsRow title={'Goals'} homeScore={3} awayScore={1}/>
            <StatsRow title={'Assists'} homeScore={2} awayScore={1}/>
            <StatsRow title={'Passes'} homeScore={125} awayScore={120}/>
            <StatsRow title={'TKLs/INTs'} homeScore={140} awayScore={150}/>
            <StatsRow title={'Positions'} homeScore={55} awayScore={45}/>
            <StatsRow title={'Goal Kicks'} homeScore={1} awayScore={1}/>
            <StatsRow title={'Corner Kicks'} homeScore={1} awayScore={1}/>
            <StatsRow title={'Throw Ins'} homeScore={2} awayScore={3}/>
            <StatsRow title={'Penalties'} homeScore={0} awayScore={0}/>
            <StatsRow title={'Foul'} homeScore={4} awayScore={1}/>
            <StatsRow title={'Yellow Cards'} homeScore={4} awayScore={1}/>
            <StatsRow title={'Red Cards'} homeScore={1} awayScore={0}/>
            <div className="flex flex-row w-full space-x-2">
                <div className="flex flex-col flex-1 space-y-2">
                    <StatsPlayer home={true}/>
                    <StatsPlayer home={true}/>
                    <StatsPlayer home={true}/>
                    <StatsPlayer home={true}/>
                    <StatsPlayer home={true}/>
                </div>
                <div className="flex flex-col flex-1 space-y-2">
                    <StatsPlayer home={false}/>
                    <StatsPlayer home={false}/>
                    <StatsPlayer home={false}/>
                    <StatsPlayer home={false}/>
                    <StatsPlayer home={false}/>
                </div>
            </div>

        </div>
    )
}