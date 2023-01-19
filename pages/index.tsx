import { useContext } from 'react'
import { SiteContext } from '../context/SiteContext'
import { notificationType } from '../typings'
import { getOfferNotifications } from '../utils/mongodb/getOffers'
import { getTeamByUserId } from '../utils/mongodb/getTeams'
import { getUserByUid } from '../utils/mongodb/getUsers'
import { withSessionSsr } from '../utils/src/ironSessionHandlers'

export default function Index({notifications}: {notifications: notificationType[]}){
    const siteData = useContext(SiteContext)
    siteData.setNotifications(notifications)
    return(
        <div>
            asdasd
        </div>
    )
}


export const getServerSideProps=withSessionSsr(
    async function getServerSideProps({req}) {
        let notifications = [
            {id:'1', title: 'There is no notification', href: '/'}
        ]
        const userUid = req.session.user
        if(userUid && userUid.uid){
            const user = await getUserByUid({uid: userUid.uid})
            if (user){
                const team = await getTeamByUserId({userId: user._id.toString()})
                if (team){
                    const offerNotifications = await getOfferNotifications({userId: user._id.toString(), teamId: team._id.toString()})
                    return {
                        props: {notifications: offerNotifications}
                    }
                }else{
                    const offerNotifications = await getOfferNotifications({userId: user._id.toString()})
                    return {
                        props: {notifications: offerNotifications}
                    }
                }
            }else{
                return {
                    props:{notifications}
                }
            }
        }else{
            return {
                props:{notifications}
            }
        }
    }
)