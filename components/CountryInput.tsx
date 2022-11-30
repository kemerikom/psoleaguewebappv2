'use client'
import { Combobox } from '@headlessui/react'
import {Dispatch,SetStateAction,useState} from 'react'
import CountryList from '../utils/src/countryList.json'
import ReactCountryFlag from "react-country-flag"

type countryType={
    name:string,
    code:string
}


export default function CountryInput({value,setValue}:{value:countryType,setValue:Dispatch<SetStateAction<countryType>>}){
    const [query,setQuery]=useState<string>('')
    const filteredCountry=
    query==''?CountryList:CountryList.filter((ct)=>{
        return ct.name.toLocaleLowerCase().includes(query.toLowerCase())
    })
    return(
        <Combobox className='relative text-white' as='div' value={value} onChange={setValue}>
            <Combobox.Input className={'inputSignUp'} placeholder='Your country' onChange={(e)=>setQuery(e.target.value)} displayValue={(country:{code:string,name:string})=>country.name}></Combobox.Input>
            <Combobox.Options className={'flex flex-col w-full absolute top-12 left-0 z-10 bg-blue-900 max-h-96 overflow-auto p-2 rounded'}>
                {filteredCountry.map((country)=>{
                    return(
                        <Combobox.Option className={'flex flex-row py-1 space-x-2 items-center justify-start hover:bg-blue-600 cursor-pointer rounded'} key={country.code} value={country}>
                            <ReactCountryFlag countryCode={country.code} svg title={country.code} style={{width:'30px'}}/>
                            <label className="cursor-pointer">{country.name}</label>
                        </Combobox.Option>
                    )
                })}
            </Combobox.Options>
        </Combobox>
    )
}