'use client'
import { Dispatch, useState } from "react"
import {IoCheckbox} from 'react-icons/io5'



export default function SwitchToggle({enabled,setEnabled,title,className,...props}:{enabled:boolean,setEnabled:Dispatch<boolean>,title:string,className:string}){
    return(
        <div className={`flex flex-row items-center justify-center space-x-2 ${className}`} onClick={()=>{setEnabled(!enabled)}}>
            <div className="border border-gray-600 rounded">
                <IoCheckbox className={`flex text-2xl ${enabled?'visible':'invisible'} text-blue-600`}/>
            </div>
            <label>{title}</label>
        </div>
    )
}