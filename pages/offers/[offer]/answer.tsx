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
                            props: {offer: resOffer}
                        }
                    }else{
                        const team = await getTeamByUserId({userId: user._id.toString()})
                        return{
                            props: {offer: resOffer}
                        }
                    }
                }else{
                    return {
                        redirect: {
                            permanent: false,
                            destination: `/orders/${resOffer._id.toString()}`
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