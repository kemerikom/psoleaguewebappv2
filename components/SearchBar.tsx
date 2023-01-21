import { Dispatch, KeyboardEvent, SetStateAction } from 'react'
import {IoFootball, IoSearchOutline} from 'react-icons/io5'
import { useState } from 'react'

export default function SearchBar({value,setValue,goSearch, loading}:{value:string,setValue:Dispatch<SetStateAction<string>>,goSearch: Dispatch<SetStateAction<boolean>>, loading?: boolean}){
    
    return(
        <div className="flex flex-row items-center justify-center bg-white py-1 px-3 rounded-full mx-auto space-x-1">
            <input className='rounded-full bg-transparent' maxLength={20} value={value} onChange={(e)=>setValue(e.currentTarget.value)} onKeyDown={(e)=>keyDown(e)}  type={'search'} pattern="[A-Za-z]" placeholder="Search..."/>
            <div onClick={search}>
                {loading && 
                    <IoFootball className='text-xl animate-spin'/>
                }
                {!loading && 
                    <IoSearchOutline className='text-xl cursor-pointer'/>
                }
                
            </div>
        </div>
    )
    function keyDown(e:KeyboardEvent<HTMLInputElement>){
        if(e.key=='Enter' && value.length>=2) goSearch(true)
    }
    function search(){
        if (value.length>=2) goSearch(true)

    }
}