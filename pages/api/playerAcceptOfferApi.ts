import { NextApiRequest, NextApiResponse } from "next";
import { getOfferById, playerAcceptOffer } from "../../utils/mongodb/getOffers";
import { getUserByUid } from "../../utils/mongodb/getUsers";
import { withSessionRouter } from "../../utils/src/ironSessionHandlers";

async function playerAcceptOfferApi(req: NextApiRequest, res: NextApiResponse) {
    if (req.method=='POST'){
        const body = JSON.parse(req.body)
        const {offerId} = body
        const userUid = req.session.user
        if (userUid && userUid.uid){
            const {uid} = userUid
            const user = await getUserByUid({uid})
            if (user){
                const offer = await getOfferById({offerId})
                if (offer){
                    if(offer.toplayer){
                        if (!offer.rejectplayer){
                            const result = await playerAcceptOffer({offerId})
                            res.status(200).json(result)
                        }else{
                            res.status(400).json('Offer already rejected')
                        }
                    }else{
                        res.status(400).json('You have no permission')
                    }

                }else{
                    res.status(400).json('Offer is not valid')
                }
            }else{
                res.redirect('/auth/login')
            }
        }else{
            res.redirect('/auth/login')
        }

    }else{
        res.status(400).json('Connection failed')
    }
}


export default withSessionRouter(playerAcceptOfferApi)