import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5"
import OfferPage from "../../../components/offers/OfferPage"
import { offerType } from "../../../typings"
import { getOfferById } from "../../../utils/mongodb/getOffers"
import { getTeamByUserId } from "../../../utils/mongodb/getTeams"
import { getUserByUid } from "../../../utils/mongodb/getUsers"
import { withSessionSsr } from "../../../utils/src/ironSessionHandlers"
import { useState } from 'react'
import Loading from "../../../components/Loading"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Answer({offer}: {offer:offerType}){
    const [loading, setLoading]= useState<boolean>(false)
    const [acceptPlayer, setAcceptPlayer] = useState<boolean>(offer.acceptplayer || false)
    const [rejectPlayer, setRejectPlayer] = useState<boolean>(offer.rejectplayer || false)
    const [acceptTeam, setAcceptTeam] = useState<boolean>(offer.acceptteam || false)
    const [rejectTeam, setRejectTeam] = useState<boolean>(offer.rejectteam || false)

    return(
        <div className="flex relative flex-col space-y-2 max-w-4xl w-full p-2 my-3 mx-auto bg-white backdrop-blur-sm bg-opacity-70 rounded items-center justify-center">
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
            <h1>
                Transfer Offer
            </h1>
            <hr/>
            <OfferPage offer={offer}/>
            <div className="flex flex-row w-full flex-wrap items-center justify-between p-2">
                <div className="flex flex-row items-center justify-center space-x-2">
                    <label>{offer.toplayer.username}:</label>
                    {!acceptPlayer && !rejectPlayer &&
                    <>
                        <button className="btnPrimary" onClick={playerAccept}>
                            {loading &&
                                <Loading/>
                            }
                            {!loading && 
                                'Accept'
                            }
                        </button>
                        <button className="btnSecondary" onClick={playerReject}>
                            {loading &&
                                <Loading/>
                            }
                            {!loading && 
                                'Reject'
                            }    
                        </button>
                    </>
                    }
                    {acceptPlayer && 
                        <IoCheckmarkCircle className="text-2xl text-green-800"/>
                    }
                    {rejectPlayer &&
                        <IoCloseCircle className="text-2xl text-red-800"/>
                    }
                </div>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <label>{offer.toteam?.teamname}:</label>
                    {!acceptTeam && !rejectTeam &&
                    <>
                        <button className="btnPrimary" onClick={teamAccept}>
                            {loading &&
                                <Loading/>
                            }
                            {!loading && 
                                'Accept'
                            }
                        </button>
                        <button className="btnSecondary" onClick={teamReject}>
                            {loading &&
                                <Loading/>
                            }
                            {!loading && 
                                'Reject'
                            }
                        </button>
                    </>
                    }
                    {acceptTeam && 
                        <IoCheckmarkCircle className="text-2xl text-green-800"/>
                    }
                    {rejectTeam &&
                        <IoCloseCircle className="text-2xl text-red-800"/>
                    }
                </div>
            </div>

        </div>
    )

    async function playerAccept() {
        setLoading(true)
        const res = await fetch(`${process.env.appPath}/api/playerAcceptOfferApi`,{
            method: 'POST',
            body: JSON.stringify({offerId: offer._id.toString()})
        })
        const result = await res.json()
        if (res.status==200){
            setAcceptPlayer(true)
            toast.success('You accepted a transfer offer')
        }else{
            toast.error(result)
        }
        setLoading(false)
    }


    async function playerReject() {
        setLoading(true)
        const res = await fetch(`${process.env.appPath}/api/playerRejectOfferApi`,{
            method: 'POST',
            body: JSON.stringify({offerId: offer._id.toString()})
        })
        const result = await res.json()
        if (res.status==200){
            setRejectPlayer(true)
            toast.success('You rejected a transfer offer')
        }else{
            toast.error(result)
        }
        setLoading(false)
    }

    async function teamAccept() {
        setLoading(true)
        const res = await fetch(`${process.env.appPath}/api/teamAcceptOfferApi`,{
            method: 'POST',
            body: JSON.stringify({offerId: offer._id.toString()})
        })
        const result = await res.json()
        if (res.status==200){
            setAcceptTeam(true)
            toast.success('You rejected a transfer offer')
        }else{
            toast.error(result)
        }
        setLoading(false)
    }

    async function teamReject() {
        setLoading(true)
        const res = await fetch(`${process.env.appPath}/api/teamRejectOfferApi`,{
            method: 'POST',
            body: JSON.stringify({offerId: offer._id.toString()})
        })
        const result = await res.json()
        if (res.status==200){
            setRejectTeam(true)
            toast.success('You rejected a transfer offer')
        }else{
            toast.error(result)
        }
        setLoading(false)
    }
}


export const getServerSideProps = withSessionSsr (
    async function getServerSideProps( {req, params} ) {
        const userUdi= req.session.user
        if (userUdi?.uid && params?.offer) {
            const {uid} = userUdi
            const user = await getUserByUid({uid})
            const resOffer = await getOfferById({offerId: params?.offer.toString()})
            if(resOffer){
                if (user){
                    if (user._id.toString()==resOffer.toplayer.id){
                        return{
                            props: {offer: JSON.parse(JSON.stringify(resOffer))}
                        }
                    }else{
                        const team = await getTeamByUserId({userId: user._id.toString()})
                        if (team?._id.toString()==resOffer.toteam.id){
                            if (team?.captain==user._id.toString() || team?.cocaptain==user._id.toString()){
                                return{
                                    props: {offer: JSON.parse(JSON.stringify(resOffer))}
                                }
                            }else{
                                return {
                                    redirect: {
                                        permanent: false,
                                        destination: `/offers/${resOffer._id.toString()}`
                                    }
                                }
                            }
                        }else{
                            return {
                                redirect: {
                                    permanent: false,
                                    destination: `/offers/${resOffer._id.toString()}`
                                }
                            }
                        }
                    }
                }else{
                    return {
                        redirect: {
                            permanent: false,
                            destination: `/offers/${resOffer._id.toString()}`
                        }
                    }
                }
            }else{
                return{
                    notFound: true
                }
            }
        }else{
            return{
                redirect: {
                    permanent: false,
                    destination: `/offers/${params?.offer}`
                }
            }
        }
    }
)