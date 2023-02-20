import { LookingForTeamType, notificationType, transferType } from '../typings'
import { getOfferNotifications } from '../utils/mongodb/getOffers'
import { getTeamByUserId } from '../utils/mongodb/getTeams'
import { getLastTransfers } from '../utils/mongodb/getTransfers'
import { getUserByUid } from '../utils/mongodb/getUsers'
import { withSessionSsr } from '../utils/src/ironSessionHandlers'
import Transfer from '../components/index/Transfer'
import Link from 'next/link'
import LookingForTeam from '../components/LookingForTeam'
import { lookingForTeamList } from '../utils/mongodb/getLookingFor'
import { IoAdd, IoAddCircle, IoFootball } from 'react-icons/io5'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { toastSettings } from '../utils/src/toastSettings'
import { useRouter } from 'next/router'
import { Popover } from '@headlessui/react'
import positionList from '../utils/src/positionList.json'


export default function Index({notifications, transfers, lookingForTeam}: {notifications: notificationType[], transfers: transferType[], lookingForTeam?: LookingForTeamType[]}){
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedPositions, setSelectedPositions] = useState<string[]>([])
    return(
        <div className='flex flex-row my-3 items-center justify-center p-3 flex-wrap'>
            <ToastContainer theme='colored'/>
            
            <div className='flex flex-col m-2 max-w-md w-full max-h-[calc(100vh-110px)] h-[calc(100vh-100px)] rounded items-center p-1'>
                <div className='flex flex-col flex-1 w-full mb-1 space-y-2 rounded bg-white backdrop-blur-sm bg-opacity-70 items-center justify-start p-2 overflow-auto scrollbarStyle'>
                    <h2 className='text-xl font-medium'>Notifications</h2>
                    <hr/>
                    {notifications.map((notification) => {
                        return(
                            <Link
                                key={notification.id}
                                href={notification.href}
                                className='p-2 rounded bg-white hover:bg-blue-600 hover:text-white transition-all w-full'
                                >
                                    {notification.title}
                            </Link>
                        )
                    })}
                </div>
                <div className='flex flex-col flex-1 w-full mt-1 rounded bg-white backdrop-blur-sm bg-opacity-70 items-center justify-start p-2'>
                    <h2 className='text-xl font-medium'>Last Matches</h2>
                    <hr/>
                </div>
            </div>
            <div className='flex flex-col space-y-2 m-2 max-w-md w-full max-h-[calc(100vh-110px)] h-[calc(100vh-100px)] bg-white backdrop-blur-sm bg-opacity-70 rounded items-center p-2 overflow-auto scrollbarStyle'>
                <h2 className='text-xl font-medium sticky top-0 rounded p-2 w-full text-center backdrop-blur-sm'>Last Transfers</h2>
                <hr/>
                {transfers.length == 0 &&
                    <p>Not transfers yet</p>
                }
                {transfers.map((transfer) => {
                    return(
                        <Transfer key={transfer._id.toString()} transfer={transfer}/>
                    )
                })}
            </div>
            <div className='flex flex-col group relative m-2 max-w-md w-full max-h-[calc(100vh-110px)] h-[calc(100vh-100px)] rounded items-center p-1'>
                <div className='flex flex-col flex-1 space-y-2 w-full mb-1 rounded bg-white backdrop-blur-sm bg-opacity-70 items-center justify-start p-2 overflow-auto scrollbarStyle'>
                    <h2 className='text-xl font-medium sticky top-0 rounded p-2 w-full text-center backdrop-blur-sm'>
                        <Link href={'/looking_for_team'} className='link'>Looking For Team</Link>
                        <button className='flex w-8 h-8 opacity-0 group-hover:opacity-100 hover:shadow-gray-600 hover:shadow-md absolute top-0 right-2 rounded-full bg-blue-600 text-white items-center justify-center transition-all' onClick={addLookingForTeam}>
                            {loading && 
                                <IoFootball className='text-2xl animate-spin'/>
                            }
                            {!loading && 
                                <IoAdd className='text-2xl'/>
                            }
                            
                        </button>
                    </h2>
                    <hr/>
                    
                    <div className='flex flex-col w-full space-y-2'>
                        {lookingForTeam?.map((lft) => {
                            return(
                                <LookingForTeam key={lft._id.toString()} data={lft}/>
                            )
                        })}
                    </div>
                </div>
                <div className='flex flex-col flex-1 w-full mt-1 rounded bg-white backdrop-blur-sm bg-opacity-70 items-center justify-start p-2'>
                    <h2 className='text-xl font-medium sticky top-0 rounded p-2 w-full text-center backdrop-blur-sm'>
                        <Link href={'/looking_for_team'} className='link'>Looking For Player</Link>
                        <button className='flex w-8 h-8 opacity-0 group-hover:opacity-100 hover:shadow-gray-600 hover:shadow-md absolute top-0 right-2 rounded-full bg-blue-600 text-white items-center justify-center transition-all'>
                            {loading && 
                                <IoFootball className='text-2xl animate-spin'/>
                            }
                            {!loading && 
                                <Popover>
                                    <Popover.Button className={'flex items-center justify-center'}>
                                        <IoAdd className='text-2xl'/>
                                    </Popover.Button>
                                    <Popover.Panel className={'flex flex-col text-base absolute top-0 left-0 translate-y-full -translate-x-1/2 p-2 rounded bg-blue-600'}>
                                        <div className='flex flex-row'>
                                            {positionList.map((p) => {
                                                return(
                                                    <button key={p.pos} className={`${selectedPositions.includes(p.pos)?'bg-green-600 hover:bg-green-800':'bg-blue-600 hover:bg-blue-800'} flex h-10 w-10 aspect-square items-center justify-center rounded transition-all`} onClick={() => addRemovePositon(p.pos)}>
                                                        {p.pos}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                        <button className='btnPrimary' onClick={addLookingForPlayer}>Share</button>
                                    </Popover.Panel>
                                </Popover>
                            }
                        </button>
                    </h2>
                    <hr/>
                </div>
            </div>
        </div>
    )
    async function addLookingForTeam(){
        if (loading) return
        setLoading(true)
        const resLft = await fetch(`${process.env.appPath}/api/addLookingForTeamApi`, {
            method: 'POST'
        })
        const lft = await resLft.json()
        if (resLft.status == 200){
            toast.success('Succesfully updated', toastSettings)
            router.reload()
        }else{
            toast.error(lft, toastSettings)
        }
        setLoading(false)
    }


    function addRemovePositon(pos: string) {
        if (selectedPositions.includes(pos)){
            setSelectedPositions(selectedPositions.filter((sp) => {return sp != pos}))
        }else{
            setSelectedPositions(oldPos => [...oldPos, pos])
        }
    }



    async function addLookingForPlayer() {
        if (loading) return
        setLoading(true)
        const resLfp = await fetch(`${process.env.appPath}/api/addLookingForPlayerApi`, {
            method: 'POST',
            body: JSON.stringify({
                positions: selectedPositions
            })
        })
        const res = await resLfp.json()
        if (resLfp.status == 200) {
            toast.success('You are looking for player now.', toastSettings)
        }else {
            toast.error(res, toastSettings)
        }
        setLoading(false)
    }
}


export const getServerSideProps=withSessionSsr(
    async function getServerSideProps({req}) {
        let notifications = [
            {id:'1', title: 'There is no notification', href: '/'}
        ]
        const userUid = req.session.user
        const transferList = await getLastTransfers()
        const lookingForTeam = await lookingForTeamList({page:1})
        if(userUid && userUid.uid){
            const user = await getUserByUid({uid: userUid.uid})
            if (user){
                const team = await getTeamByUserId({userId: user._id.toString()})
                if (team){
                    const offerNotifications = await getOfferNotifications({userId: user._id.toString(), teamId: team._id.toString()})
                    return {
                        props: {
                            notifications: offerNotifications.length ==0? notifications: JSON.parse(JSON.stringify(offerNotifications)),
                            transfers: JSON.parse(JSON.stringify(transferList)),
                            lookingForTeam: JSON.parse(JSON.stringify(lookingForTeam))
                        }
                    }
                }else{
                    const offerNotifications = await getOfferNotifications({userId: user._id.toString()})
                    return {
                        props: {
                            notifications: offerNotifications.length ==0? notifications: JSON.parse(JSON.stringify(offerNotifications)),
                            transfers: JSON.parse(JSON.stringify(transferList)),
                            lookingForTeam: JSON.parse(JSON.stringify(lookingForTeam))
                        }
                    }
                }
            }else{
                return {
                    props:{
                        notifications,
                        transfers: JSON.parse(JSON.stringify(transferList)),
                        lookingForTeam: JSON.parse(JSON.stringify(lookingForTeam))
                    }
                }
            }
        }else{
            return {
                props:{
                    notifications,
                    transfers: JSON.parse(JSON.stringify(transferList)),
                    lookingForTeam: JSON.parse(JSON.stringify(lookingForTeam))
                }
            }
        }
    }
)