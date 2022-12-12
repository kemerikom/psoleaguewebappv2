'use client'
import SwitchToggle from "../../../components/SwitchToggle"
import { useState } from "react"
import createSchedule from "../../../utils/src/createSchedule"


export default function CreateSchedule(){
    const [oneLeg,setOneLeg]=useState<boolean>(true)
    const [minDelay,setMinDelay]=useState<number>()
    const [dailyMatch,setDailyMatch]=useState<number>()
    const [startDate,setStartDate]=useState<any>()
    return(
        <div className="flex flex-col p-2 space-y-2 bg-white rounded items-center">
            <h2>Create Schedule</h2>
            <hr/>
            <div className="flex flex-row w-full flex-wrap items-start justify-start space-x-2 space-y-2">
                <SwitchToggle className='bg-blue-100 h-10 px-2 rounded my-2' enabled={oneLeg} setEnabled={setOneLeg} title={'One Leg'}/>
                <div className="flex flex-row items-center justify-center h-10 px-2 bg-blue-100 rounded">
                    <input className="appearance-none bg-transparent" defaultValue={minDelay} onChange={(e)=>setMinDelay(e.target.value as any)} type='number' min={1} max={120} placeholder='1-120'></input>
                    <label>Minutes between 2 matches</label>
                </div>
                <div className="flex flex-row items-center justify-center h-10 px-2 bg-blue-100 rounded">
                    <input className="appearance-none bg-transparent" defaultValue={dailyMatch} onChange={(e)=>setDailyMatch(e.target.value as any)} type='number' min={1} max={10} placeholder='1-10'></input>
                    <label>Daily match count</label>
                </div>
                <div className="flex flex-row items-center justify-center h-10 px-2 bg-blue-100 rounded">
                    <input className="appearance-none bg-transparent" defaultValue={startDate} onChange={(e)=>setStartDate(e.target.value as any)} type='number' min={1} max={10} placeholder='1-10'></input>
                    <label>Daily match count</label>
                </div>
                <button onClick={test} className="btnPrimary h-10">Generate Schedule</button>
            </div>
        </div>
    )
    function test(){
        const teams=[
            {id:'asdasdasda',teamname:'LaSisX'},
            {id:'asdasdasdd',teamname:'Aederd'},
            {id:'asdasdasdf',teamname:'Esperion'},
            {id:'asdasdasdg',teamname:'Gullit Gang'},
            {id:'asdasdasdg',teamname:'Ronins'},
        ]
        const res = createSchedule({teams,oneLeg,minDelay,dailyMatch,startDate})
        console.log(res)
    }
}