'use client'
import SwitchToggle from "../../../components/SwitchToggle"
import { useState } from "react"
import createSchedule from "../../../utils/src/createSchedule"
import { Listbox } from "@headlessui/react"
import { tableScheduleType } from "../../../typings"
import TableSchedule from "../../../components/TableSchedule"
const weekOfDays=[
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'No Free Day'
]

export default function CreateSchedule(){
    const [oneLeg,setOneLeg]=useState<boolean>(true)
    const [minDelay,setMinDelay]=useState<number>(45)
    const [dailyMatch,setDailyMatch]=useState<number>(3)
    const [startDate,setStartDate]=useState<any>()
    const [freeDays,setFreeDays]=useState<string[]>([weekOfDays[7]])
    const [schedule,setSchedule]=useState<tableScheduleType[]>([])
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
                    <input className="bg-transparent" type={'datetime-local'} defaultValue={startDate} onChange={(e)=>setStartDate(e.target.value)}></input>
                    <label>First match date</label>
                </div>
                <div className="flex flex-row items-center justify-center min-h-10 h-10 px-2 bg-blue-100 rounded space-x-2">
                    <label>Choose free day(s)</label>
                    <Listbox as='div' value={freeDays} onChange={setFreeDays} multiple>
                        <Listbox.Button>
                            {freeDays.map((fd)=>fd).join(', ')}
                        </Listbox.Button>
                        <Listbox.Options className={'absolute bg-blue-100 top-0 translate-y-1/2 right-0 p-2 rounded z-[2] space-y-2'}>
                            {weekOfDays.map((day)=>(
                                <Listbox.Option className={`${freeDays.includes(day)?'bg-blue-600 text-white':'bg-blue-100 text-black'} p-2 rounded overflow-y-visible max-h-16`} key={day} value={day}>
                                    {day}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Listbox>
                </div>
                <button onClick={test} className="btnPrimary h-10">Generate Schedule</button>
            </div>
            <hr/>
            <div className="flex flex-col w-full items-center justify-center space-y-2">
                <h2>Schedule</h2>
                <hr/>
                <TableSchedule schedule={schedule}/>
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
        const res:tableScheduleType[] = createSchedule({teams,oneLeg,minDelay,dailyMatch,startDate})
        setSchedule(res)
    }
}