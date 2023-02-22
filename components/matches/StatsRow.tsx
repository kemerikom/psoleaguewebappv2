import { useState, useEffect } from 'react'



export default function StatsRow({title, homeScore, awayScore}: {title: string, homeScore: number, awayScore: number}) {
    const [homeFlexValue, setHomeFlexValue] = useState<number>(homeScore)
    const [awayFlexValue, setAwayFlexValue] = useState<number>(awayScore)
    useEffect(() => {
        if (homeScore == 0 && awayScore == 0) {
            setHomeFlexValue(1)
            setAwayFlexValue(1)
        }
    }, [awayScore, homeScore])
    return(
        <div className="flex flex-row w-full items-start">
            <div className="flex flex-col w-40 items-center justify-center mx-2">
                <div className="flex items-center justify-center">
                    <div className="flex h-10 items-center justify-center">
                        {title}
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full items-center"
            style={{flex: homeFlexValue}}>
                <div className="flex items-end w-full justify-center">
                    <div className="flex h-10 w-full items-center justify-center bg-red-600 rounded-l font-medium text-xl px-2 text-white">
                        {homeScore}
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full items-center"
            style={{flex: awayFlexValue}}>
                <div className="flex items-end w-full justify-center">
                    <div className="flex h-10 w-full items-center justify-center bg-blue-600 rounded-r font-medium text-xl px-2 text-white">
                        {awayScore}
                    </div>
                </div>
            </div>
        </div>
    )
}