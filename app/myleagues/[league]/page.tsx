import {leagueName} from '../../../typings'
import Link from 'next/link'
import {IoCloseCircle} from 'react-icons/io5'
import PageView from './PageView'

type PagePros={
    params:{
        league:string
    }
}


async function getLeagueInfo({league}:{league:string}) {
    const res = await fetch(`${process.env.appPath}/api/getLeagueApi`,{
        method:'POST',
        body:league,
        next:{revalidate:60}
    })
    const data = await res.json()
    return data
}

export default async function Page({params:{league}}:PagePros){
    const leagueInfo:leagueName=await getLeagueInfo({league})
    return(
        <div className="flex flex-col w-full bg-white bg-opacity-70 backdrop-blur-sm p-3 rounded justify-center space-y-2">
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex w-16 aspect-square items-center justify-center rounded-full">
                    <img src='/teamlogo.png' className="flex w-16 aspect-square object-contain rounded-full"></img>
                </div>
                <h1>{leagueInfo.name}</h1>
                <Link href={'/myleagues'} className='items-start justify-start'>
                    <IoCloseCircle className='text-blue-600 text-3xl'/>
                </Link>
            </div>
            <hr/>
            <PageView data={leagueInfo}/>
        </div>
    )
}