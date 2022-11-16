import { Dispatch, KeyboardEvent, SetStateAction } from 'react'
import {IoSearchOutline} from 'react-icons/io5'

export default function SearchBar({value,setValue,goSearch}:{value:string,setValue:Dispatch<SetStateAction<string>>,goSearch:Dispatch<SetStateAction<boolean>>}){
    return(
        <div className="flex flex-row items-center justify-center bg-white py-1 px-3 rounded-full mx-auto space-x-1">
            <input className='rounded-full bg-transparent' maxLength={20} value={value} onChange={(e)=>setValue(e.currentTarget.value)} onKeyDown={(e)=>keyDown(e)}  type={'search'} pattern="[A-Za-z]" placeholder="Search a team..."/>
            <div>
                <IoSearchOutline className='text-xl cursor-pointer'/>
            </div>
        </div>
    )
    function keyDown(e:KeyboardEvent<HTMLInputElement>){
        if(e.key=='Enter') goSearch(true)
    }
}