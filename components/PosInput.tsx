'use client'
import { Dispatch, SetStateAction } from 'react'
import {useState} from 'react'
import { Combobox } from '@headlessui/react'
import positionList from '../utils/src/positionList.json'

type posType={
    pos:string
}


export default function PosInput({value,setValue,placeholder}:{value:posType,setValue:Dispatch<SetStateAction<posType>>,placeholder:string}){
    const [query,setQuery]=useState<string>('')
    const filteredQuery=
    query==''?positionList:positionList.filter((pos)=>{
        return pos.pos.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    })
    return(
        <Combobox className='relative text-white' as='div' value={value} onChange={setValue}>
            <Combobox.Input className={'inputSignUp'} placeholder={placeholder} onChange={(e)=>setQuery(e.target.value)} displayValue={(value:{pos:string})=>value.pos}></Combobox.Input>
            <Combobox.Options className={'flex flex-col w-full absolute top-12 left-0 z-10 bg-blue-900 max-h-96 overflow-auto p-2 rounded'}>
                {filteredQuery.map((pos)=>{
                    return(
                        <Combobox.Option className={'flex flex-row py-1 px-2 space-x-2 items-center justify-start hover:bg-blue-600 cursor-pointer rounded'} key={pos.pos} value={pos}>
                            {pos.pos}
                        </Combobox.Option>
                    )
                })}
            </Combobox.Options>
        </Combobox>
    )
}