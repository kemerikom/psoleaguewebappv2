'use client'
import { leagueName } from "../../../typings";
import {IoCloudUploadOutline, IoHelpCircleOutline} from 'react-icons/io5'
import {useState,useEffect} from 'react'
import { teamInSize } from "../../../utils/src/teamInSize";
import { Switch,Popover } from "@headlessui/react";



export default function SettingsList({data}:{data:leagueName}){
    const [transferEnd,setTransferEnd]=useState<Date>(new Date(data.transferend||0))
    const [minTeamSize,setMinTeamSize]=useState<number>(data.minteamsize||8)
    const [maxTeamSize,setMaxTeamSize]=useState<number>(data.maxteamsize||16)
    const [teamSize,setTeamSize]=useState<string>(data.teaminsize||'8v8')
    const [invite,setInvite]=useState<boolean>(data.invite||false)
    return(
        <div className="flex flex-col p-2 bg-white rounded space-y-2 max-w-4xl w-full overflow">
            <div className="flex flex-row h-8 items-center w-full">
                <label>Transfer Season Ending: </label>
                <input type={'datetime-local'} defaultValue={transferEnd.toISOString().substring(0,16)} onChange={((e:any)=>setTransferEnd(new Date(e.target.value)))}></input>
                <div className={`${transferEnd.getTime()!=(data.transferend||0)?'flex':'hidden'} aspect-square h-full bg-blue-600 text-white rounded cursor-pointer ml-auto items-center justify-center`}>
                    <IoCloudUploadOutline className="text-xl"/>
                </div>
            </div>
            <div className="flex flex-row h-8 items-center w-full">
                <label>Minimum Team Size: </label>
                <input type={'number'} placeholder='16' defaultValue={minTeamSize.toString()} onChange={((e)=>setMinTeamSize(parseInt(e.target.value)))}></input>
                <div className={`${minTeamSize!=data.minteamsize?'flex':'hidden'} aspect-square h-full bg-blue-600 text-white rounded cursor-pointer ml-auto items-center justify-center`}>
                    <IoCloudUploadOutline className="text-xl"/>
                </div>
            </div>
            <div className="flex flex-row h-8 items-center w-full">
                <label>Maximum Team Size:</label>
                <input type={'number'} placeholder='16' defaultValue={maxTeamSize.toString()} onChange={((e)=>setMaxTeamSize(parseInt(e.target.value)))}></input>
                <div className={`${maxTeamSize!=data.maxteamsize?'flex':'hidden'} aspect-square h-full bg-blue-600 text-white rounded cursor-pointer ml-auto items-center justify-center`}>
                    <IoCloudUploadOutline className="text-xl"/>
                </div>
            </div>
            <div className="flex flex-row h-8 items-center w-full">
                <label>Formation: </label>
                <select defaultValue={teamSize} className='mx-1' onChange={((e)=>setTeamSize(e.target.value))}>
                    {teamInSize.map((t)=>{
                        return(
                            <option key={t} value={t}>{t}</option>
                        )
                    })}
                </select>
                <div className={`${teamSize!=data.teaminsize?'flex':'hidden'} aspect-square h-full bg-blue-600 text-white rounded cursor-pointer ml-auto items-center justify-center`}>
                    <IoCloudUploadOutline className="text-xl"/>
                </div>
            </div>
            <div className="flex flex-row h-8 items-center w-full">
                <label>Accepting:</label>
                <label className="flex flex-row mx-1">
                    Request
                </label>
                
                <Switch
                checked={invite}
                onChange={setInvite}
                className={`${
                    invite ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full mx-1`}
                >
                <span
                    className={`${
                    invite ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
                </Switch>
                <label className="mx-1">Invite</label>
                <div className={`${invite!=data.invite?'flex':'hidden'} aspect-square h-full bg-blue-600 text-white rounded cursor-pointer ml-auto items-center justify-center`}>
                    <IoCloudUploadOutline className="text-xl"/>
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2">
                <button className="flex py-2 px-4 bg-blue-600 text-white rounded">Set As Inactive</button>
                <button className="flex py-2 px-4 bg-blue-600 text-white rounded">Transfer Ownership</button>
            </div>
        </div>
    )
}