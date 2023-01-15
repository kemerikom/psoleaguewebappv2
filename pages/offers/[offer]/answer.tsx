import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5"
import OfferPage from "../../../components/offers/OfferPage"
import { offerType } from "../../../typings"
import { getOfferById } from "../../../utils/mongodb/getOffers"
import { getTeamByUserId } from "../../../utils/mongodb/getTeams"
import { getUserByUid } from "../../../utils/mongodb/getUsers"
import { withSessionSsr } from "../../../utils/src/ironSessionHandlers"


export default function Answer({offer}: {offer:offerType}){
    return(
        <div className="flex relative flex-col space-y-2 max-w-4xl w-full p-2 my-3 mx-auto bg-white backdrop-blur-sm bg-opacity-70 rounded items-center justify-center">
            <h1>
                Transfer Offer
            </h1>
            <hr/>
            <OfferPage offer={offer}/>
            <div className="flex flex-row w-full flex-wrap items-center justify-between p-2">
                <div className="flex flex-row items-center justify-center space-x-2">
                    <label>{offer.toplayer.username}:</label>
                    {!offer.acceptplayer && !offer.rejectplayer &&
                    <>
                        <button className="btnPrimary">Accept</button>
                        <button className="btnSecondary">Reject</button></>
                    }
                    {offer.acceptplayer && 
                        <IoCheckmarkCircle className="text-2xl text-green-800"/>
                    }
                    {offer.rejectplayer &&
                        <IoCloseCircle className="text-2xl text-red-800"/>
                    }
                </div>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <label>{offer.toteam?.teamname}:</label>
                    {!offer.acceptteam && !offer.rejectteam &&
                    <>
                        <button className="btnPrimary">Accept</button>
                        <button className="btnSecondary">Reject</button></>
                    }
                    {offer.acceptteam && 
                        <IoCheckmarkCircle className="text-2xl text-green-800"/>
                    }
                    {offer.rejectteam &&
                        <IoCloseCircle className="text-2xl text-red-800"/>
                    }
                </div>
            </div>

        </div>
    )
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