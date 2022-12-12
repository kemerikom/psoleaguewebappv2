import {leagueName} from '../../../typings'
import Link from 'next/link'
import {IoCloseCircleOutline} from 'react-icons/io5'
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
                <div className='flex flex-shrink-0 items-start w-4 aspect-square justify-start'>
                    <Link href='/myleagues' className='flex flex-shrink-0 items-center p-2 bg-blue-600 w-4 aspect-square rounded-full text-white'>
                        <IoCloseCircleOutline className='text-2xl aspect-square'/>
                    </Link>
                </div>
            </div>
            <hr/>
            <PageView data={leagueInfo}/>
        </div>
    )
}