import { notificationType, transferType } from '../typings'
import { getOfferNotifications } from '../utils/mongodb/getOffers'
import { getTeamByUserId } from '../utils/mongodb/getTeams'
import { getLastTransfers } from '../utils/mongodb/getTransfers'
import { getUserByUid } from '../utils/mongodb/getUsers'
import { withSessionSsr } from '../utils/src/ironSessionHandlers'
import Transfer from '../components/index/Transfer'
import Link from 'next/link'

export default function Index({notifications, transfers}: {notifications: notificationType[], transfers: transferType[]}){
    return(
        <div className='flex flex-row my-3 items-center justify-center p-3 flex-wrap'>
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
            <div className='flex flex-col m-2 max-w-md w-full max-h-[calc(100vh-110px)] h-[calc(100vh-100px)] rounded items-center p-1'>
                <div className='flex flex-col flex-1 w-full mb-1 rounded bg-white backdrop-blur-sm bg-opacity-70 items-center justify-start p-2'>
                    <h2 className='text-xl font-medium'>Looking For Team</h2>
                    <hr/>
                </div>
                <div className='flex flex-col flex-1 w-full mt-1 rounded bg-white backdrop-blur-sm bg-opacity-70 items-center justify-start p-2'>
                    <h2 className='text-xl font-medium'>Looking For Player</h2>
                    <hr/>
                </div>
            </div>
            
        </div>
    )
}


export const getServerSideProps=withSessionSsr(
    async function getServerSideProps({req}) {
        let notifications = [
            {id:'1', title: 'There is no notification', href: '/'}
        ]
        const userUid = req.session.user
        const transferList = await getLastTransfers()
        if(userUid && userUid.uid){
            const user = await getUserByUid({uid: userUid.uid})
            if (user){
                const team = await getTeamByUserId({userId: user._id.toString()})
                if (team){
                    const offerNotifications = await getOfferNotifications({userId: user._id.toString(), teamId: team._id.toString()})
                    return {
                        props: {
                            notifications: offerNotifications.length ==0? notifications: JSON.parse(JSON.stringify(offerNotifications)),
                            transfers: JSON.parse(JSON.stringify(transferList))
                        }
                    }
                }else{
                    const offerNotifications = await getOfferNotifications({userId: user._id.toString()})
                    return {
                        props: {
                            notifications: offerNotifications.length ==0? notifications: JSON.parse(JSON.stringify(offerNotifications)),
                            transfers: JSON.parse(JSON.stringify(transferList))
                        }
                    }
                }
            }else{
                return {
                    props:{
                        notifications,
                        transfers: JSON.parse(JSON.stringify(transferList))
                    }
                }
            }
        }else{
            return {
                props:{
                    notifications,
                    transfers: JSON.parse(JSON.stringify(transferList))
                }
            }
        }
    }
)