import { offerType } from "../../../typings"
import { getOfferById } from "../../../utils/mongodb/getOffers"
import { getUserByUid } from "../../../utils/mongodb/getUsers"
import { withSessionSsr } from "../../../utils/src/ironSessionHandlers"


export default function Answer({offer}: {offer:offerType}){
    return(
        <div>
            {offer.fromteam.teamname}
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
            if(user){
                if (resOffer){
                    return{
                        props: {
                            offer: JSON.parse(JSON.stringify(resOffer))
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
                        destination: `/offers/${params.offer}`
                    }
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