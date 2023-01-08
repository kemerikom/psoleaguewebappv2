import { teamsType, userNameIdType } from "../../typings";
import FormationPage from "../formations/FormationPage";
import { useState,useEffect,useRef } from "react";
import { formations } from "../../utils/src/formations";
import Loading from "../Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    const ddPos0=useRef<HTMLSelectElement>(null)
    const ddPos1=useRef<HTMLSelectElement>(null)
    const ddPos2=useRef<HTMLSelectElement>(null)
    const ddPos3=useRef<HTMLSelectElement>(null)
    const ddPos4=useRef<HTMLSelectElement>(null)
    const ddPos5=useRef<HTMLSelectElement>(null)
    const ddPos6=useRef<HTMLSelectElement>(null)
    const ddPos7=useRef<HTMLSelectElement>(null)
    const [loading,setLoading]=useState<boolean>(false)
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
    useEffect(()=>{
        setRoster([pos0,pos1,pos2,pos3,pos4,pos5,pos6,pos7])
    },[pos0,pos1,pos2,pos3,pos4,pos5,pos6,pos7])
    useEffect(()=>{
        if(pos1==pos0)setPos1(-1)
        if(pos2==pos0)setPos2(-1)
        if(pos3==pos0)setPos3(-1)
        if(pos4==pos0)setPos4(-1)
        if(pos5==pos0)setPos5(-1)
        if(pos6==pos0)setPos6(-1)
        if(pos7==pos0)setPos7(-1)
    },[pos0])
    useEffect(()=>{
        if(pos0==pos1)setPos0(-1)
        if(pos2==pos1)setPos2(-1)
        if(pos3==pos1)setPos3(-1)
        if(pos4==pos1)setPos4(-1)
        if(pos5==pos1)setPos5(-1)
        if(pos6==pos1)setPos6(-1)
        if(pos7==pos1)setPos7(-1)
    },[pos1])
    useEffect(()=>{
        if(pos0==pos2)setPos0(-1)
        if(pos1==pos2)setPos1(-1)
        if(pos3==pos2)setPos3(-1)
        if(pos4==pos2)setPos4(-1)
        if(pos5==pos2)setPos5(-1)
        if(pos6==pos2)setPos6(-1)
        if(pos7==pos2)setPos7(-1)
    },[pos2])
    useEffect(()=>{
        if(pos0==pos3)setPos0(-1)
        if(pos1==pos3)setPos1(-1)
        if(pos2==pos3)setPos2(-1)
        if(pos4==pos3)setPos4(-1)
        if(pos5==pos3)setPos5(-1)
        if(pos6==pos3)setPos6(-1)
        if(pos7==pos3)setPos7(-1)
    },[pos3])
    useEffect(()=>{
        if(pos0==pos4)setPos0(-1)
        if(pos1==pos4)setPos1(-1)
        if(pos2==pos4)setPos2(-1)
        if(pos3==pos4)setPos3(-1)
        if(pos5==pos4)setPos5(-1)
        if(pos6==pos4)setPos6(-1)
        if(pos7==pos4)setPos7(-1)
    },[pos4])
    useEffect(()=>{
        if(pos0==pos5)setPos0(-1)
        if(pos1==pos5)setPos1(-1)
        if(pos2==pos5)setPos2(-1)
        if(pos3==pos5)setPos3(-1)
        if(pos4==pos5)setPos4(-1)
        if(pos6==pos5)setPos6(-1)
        if(pos7==pos5)setPos7(-1)
    },[pos5])
    useEffect(()=>{
        if(pos0==pos6)setPos0(-1)
        if(pos1==pos6)setPos1(-1)
        if(pos2==pos6)setPos2(-1)
        if(pos3==pos6)setPos3(-1)
        if(pos4==pos6)setPos4(-1)
        if(pos5==pos6)setPos5(-1)
        if(pos7==pos6)setPos7(-1)
    },[pos6])
    useEffect(()=>{
        if(pos0==pos7)setPos0(-1)
        if(pos1==pos7)setPos1(-1)
        if(pos2==pos7)setPos2(-1)
        if(pos3==pos7)setPos3(-1)
        if(pos4==pos7)setPos4(-1)
        if(pos5==pos7)setPos5(-1)
        if(pos6==pos7)setPos6(-1)
    },[pos7])
    return(
        <div className='flex flex-row w-full bg-white rounded'>
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
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
                    <select ref={ddPos0} value={pos0} onChange={((e)=>setPos0(parseInt(e.target.value)))} className='flex p-2 ml-1 bg-transparent group-hover:bg-blue-800 rounded transition-all'>
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
                    <select ref={ddPos1}  value={pos1} onChange={((e)=>setPos1(parseInt(e.target.value)))} className='flex p-2 ml-1 bg-transparent group-hover:bg-blue-800 rounded transition-all'>
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
                    <select ref={ddPos2} value={pos2} onChange={((e)=>setPos2(parseInt(e.target.value)))} className='flex p-2 ml-1 bg-transparent group-hover:bg-blue-800 rounded transition-all'>
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
                    <select ref={ddPos3} value={pos3} onChange={((e)=>setPos3(parseInt(e.target.value)))} className='flex p-2 ml-1 bg-transparent group-hover:bg-blue-800 rounded transition-all'>
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
                    <select ref={ddPos4} value={pos4} onChange={((e)=>setPos4(parseInt(e.target.value)))} className='flex p-2 ml-1 bg-transparent group-hover:bg-blue-800 rounded transition-all'>
                        <option value={-1} className='bg-blue-600'>No Player Assingment</option>
                        {data.players.map((player)=>{
                            return(
                                <option key={player.id} value={data.players.indexOf(player)} className='bg-blue-600'>{player.username}</option>
                            )
                        })}
                    </select>
                </label>
                <label className="flex flex-row group items-center justify-between bg-blue-600 p-1 rounded text-white">
                    {pos5Name}:
                    <select ref={ddPos5} value={pos5} onChange={((e)=>setPos5(parseInt(e.target.value)))} className='flex p-2 ml-1 bg-transparent group-hover:bg-blue-800 rounded transition-all'>
                        <option value={-1} className='bg-blue-600'>No Player Assingment</option>
                        {data.players.map((player)=>{
                            return(
                                <option key={player.id} value={data.players.indexOf(player)} className='bg-blue-600'>{player.username}</option>
                            )
                        })}
                    </select>
                </label>
                <label className="flex flex-row group items-center justify-between bg-blue-600 p-1 rounded text-white">
                    {pos6Name}:
                    <select ref={ddPos6} value={pos6} onChange={((e)=>setPos6(parseInt(e.target.value)))} className='flex p-2 ml-1 bg-transparent group-hover:bg-blue-800 rounded transition-all'>
                        <option value={-1} className='bg-blue-600'>No Player Assingment</option>
                        {data.players.map((player)=>{
                            return(
                                <option key={player.id} value={data.players.indexOf(player)} className='bg-blue-600'>{player.username}</option>
                            )
                        })}
                    </select>
                </label>
                <label className="flex flex-row group items-center justify-between bg-blue-600 p-1 rounded text-white">
                    {pos7Name}:
                    <select ref={ddPos7} value={pos7} onChange={((e)=>setPos7(parseInt(e.target.value)))} className='flex p-2 ml-1 bg-transparent group-hover:bg-blue-800 rounded transition-all'>
                        <option value={-1} className='bg-blue-600'>No Player Assingment</option>
                        {data.players.map((player)=>{
                            return(
                                <option key={player.id} value={data.players.indexOf(player)} className='bg-blue-600'>{player.username}</option>
                            )
                        })}
                    </select>
                </label>
                <button className={`btnPrimary`} onClick={saveRoster}>
                    {!loading&&'Save'}
                    {loading&&<Loading/>}
                </button>
            </div>
            <FormationPage color1={data.color1} color2={data.color2} fontcolor={data.fontcolor} formation={formation} roster={roster} players={data.players}/>
        </div>
    )
    async function saveRoster() {
        setLoading(true)
        const res = await fetch(`${process.env.appPath}/api/updateTeamRosterApi`,{
            method:'POST',
            body:JSON.stringify({
                teamId:data._id.toString(),
                roster,
                formation
            })
        })
        const result = await res.json()
        if(res.status==200){
            toast.success('Roster succesfully saved.')
        }else{
            toast.error(result)
        }
        setLoading(false)
    }
}