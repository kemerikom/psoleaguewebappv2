import { teamsType, userNameIdType } from "../../typings";
import FormationPage from "../formations/FormationPage";
import { useState,useEffect } from "react";
import { formations } from "../../utils/src/formations";


export default function FormationEdit({data}:{data:teamsType}){
    const [formation,setFormation]=useState<string>(data.formation||'313')
    const [roster,setRoster]=useState<number[]>(data.roster||[-1,-1,-1,-1,-1,-1,-1,-1])
    const [pos0Name,setPos0Name]=useState<string>()
    const [pos1Name,setPos1Name]=useState<string>()
    const [pos2Name,setPos2Name]=useState<string>()
    const [pos3Name,setPos3Name]=useState<string>()
    const [pos4Name,setPos4Name]=useState<string>()
    const [pos5Name,setPos5Name]=useState<string>()
    const [pos6Name,setPos6Name]=useState<string>()
    const [pos7Name,setPos7Name]=useState<string>()
    const [pos0,setPos0]=useState<number>(roster[0])
    const [pos1,setPos1]=useState<number>(roster[1])
    const [pos2,setPos2]=useState<number>(roster[2])
    const [pos3,setPos3]=useState<number>(roster[3])
    const [pos4,setPos4]=useState<number>(roster[4])
    const [pos5,setPos5]=useState<number>(roster[5])
    const [pos6,setPos6]=useState<number>(roster[6])
    const [pos7,setPos7]=useState<number>(roster[7])
    useEffect(()=>{
        setPos0Name(formations.find((f)=>f.id==formation)?.positions[0])
        setPos1Name(formations.find((f)=>f.id==formation)?.positions[1])
        setPos2Name(formations.find((f)=>f.id==formation)?.positions[2])
        setPos3Name(formations.find((f)=>f.id==formation)?.positions[3])
        setPos4Name(formations.find((f)=>f.id==formation)?.positions[4])
        setPos5Name(formations.find((f)=>f.id==formation)?.positions[5])
        setPos6Name(formations.find((f)=>f.id==formation)?.positions[6])
        setPos7Name(formations.find((f)=>f.id==formation)?.positions[7])
    },[formation])
    return(
        <div className='flex flex-col w-full bg-white rounded'>
            <div className="flex flex-col mx-auto p-2 space-y-2">
                <label className="flex flex-row group items-center justify-between bg-blue-600 p-1 rounded text-white">
                    Formation:
                    <select defaultValue={formation} onChange={((e)=>setFormation(e.target.value))} className='flex p-2 ml-1 bg-transparent group-hover:bg-blue-800 rounded transition-all'>
                        {formations.map((formation)=>{
                            return(
                                <option key={formation.id} value={formation.id} className='bg-blue-600'>{formation.label}</option>
                            )
                        })}
                    </select>
                </label>
                <label className="flex flex-row group items-center justify-between bg-blue-600 p-1 rounded text-white">
                    {pos0Name}:
                    <select defaultValue={pos0} onChange={((e)=>setPos0(parseInt(e.target.value)))} className='flex p-2 ml-1 bg-transparent group-hover:bg-blue-800 rounded transition-all'>
                        <option value={-1} className='bg-blue-600'>No Player Assingment</option>
                        {data.players.map((player)=>{
                            return(
                                <option key={player.id} value={data.players.indexOf(player)} className='bg-blue-600'>{player.username}</option>
                            )
                        })}
                    </select>
                </label>
                <label className="flex flex-row group items-center justify-between bg-blue-600 p-1 rounded text-white">
                    {pos1Name}:
                    <select defaultValue={pos1} onChange={((e)=>setPos1(parseInt(e.target.value)))} className='flex p-2 ml-1 bg-transparent group-hover:bg-blue-800 rounded transition-all'>
                        <option value={-1} className='bg-blue-600'>No Player Assingment</option>
                        {data.players.map((player)=>{
                            return(
                                <option key={player.id} value={data.players.indexOf(player)} className='bg-blue-600'>{player.username}</option>
                            )
                        })}
                    </select>
                </label>
                <label className="flex flex-row group items-center justify-between bg-blue-600 p-1 rounded text-white">
                    {pos2Name}:
                    <select defaultValue={pos2} onChange={((e)=>setPos2(parseInt(e.target.value)))} className='flex p-2 ml-1 bg-transparent group-hover:bg-blue-800 rounded transition-all'>
                        <option value={-1} className='bg-blue-600'>No Player Assingment</option>
                        {data.players.map((player)=>{
                            return(
                                <option key={player.id} value={data.players.indexOf(player)} className='bg-blue-600'>{player.username}</option>
                            )
                        })}
                    </select>
                </label>
                <label className="flex flex-row group items-center justify-between bg-blue-600 p-1 rounded text-white">
                    {pos3Name}:
                    <select defaultValue={pos3} onChange={((e)=>setPos3(parseInt(e.target.value)))} className='flex p-2 ml-1 bg-transparent group-hover:bg-blue-800 rounded transition-all'>
                        <option value={-1} className='bg-blue-600'>No Player Assingment</option>
                        {data.players.map((player)=>{
                            return(
                                <option key={player.id} value={data.players.indexOf(player)} className='bg-blue-600'>{player.username}</option>
                            )
                        })}
                    </select>
                </label>
                <label className="flex flex-row group items-center justify-between bg-blue-600 p-1 rounded text-white">
                    {pos4Name}:
                    <select defaultValue={pos4} onChange={((e)=>setPos4(parseInt(e.target.value)))} className='flex p-2 ml-1 bg-transparent group-hover:bg-blue-800 rounded transition-all'>
                        <option value={-1} className='bg-blue-600'>No Player Assingment</option>
                        {data.players.map((player)=>{
                            return(
                                <option key={player.id} value={data.players.indexOf(player)} className='bg-blue-600'>{player.username}</option>
                            )
                        })}
                    </select>
                </label>
            </div>
            <FormationPage color1={data.color1} color2={data.color2} fontcolor={data.fontcolor} formation={formation} roster={data.roster} players={data.players}/>
        </div>
    )
}