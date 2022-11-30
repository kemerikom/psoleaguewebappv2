'use client'
import ReactCountryFlag from "react-country-flag";
import Link from "next/link";
import { useEffect,useContext } from "react";
import { SiteContext } from "../../context/SiteContext";




export default function Header(){
    const siteData:any= useContext(SiteContext)
    const {uid} = siteData
    return(
        <div className="flex flex-row w-full space-x-2 bg-white backdrop-blur-sm bg-opacity-70 p-2 rounded">
            <div className="flex items-center justify-center w-32 aspect-square rounded-full">
                <img src='/teamlogo.png' className="w-full aspect-square rounded-full object-contain"></img>
            </div>
            <div className="flex flex-col space-y-1">
                <h1>Sharkman [LSX]</h1>
                <ReactCountryFlag countryCode={'TR'} svg title={'TR'} style={{width:'30px'}}/>
                <Link href={'/teams/'} className='hover:underline transition-all'>
                    LaSisX
                </Link>
                <div className="flex flex-row space-x-2">
                    <div className=" flex w-6 aspect-square rounded-full bg-green-600 items-center justify-center text-xs text-white cursor-default">
                        <label>LB</label>
                    </div>
                    <div className=" flex w-6 aspect-square rounded-full bg-green-600 items-center justify-center text-xs text-white">
                        <label>RB</label>
                    </div>
                </div>
            </div>
        </div>
    )
}