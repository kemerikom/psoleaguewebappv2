import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRouter } from "../../utils/src/ironSessionHandlers";
import { getUserByUid } from "../../utils/mongodb/getUsers";
import { getOfferById,  teamAcceptOffer, checkTransfer } from "../../utils/mongodb/getOffers";
import { getTeam } from "../../utils/mongodb/getTeams";



async function teamAcceptOfferApi(req: NextApiRequest, res: NextApiResponse) {
    if (req.method=='POST'){
        const body = JSON.parse(req.body)
        const {offerId} = body
        const userUid = req.session.user
        if (userUid && userUid.uid){
            const {uid} = userUid
            const user = await getUserByUid({uid})
            if (user){
                const teamId = user.teamid
                const team = await getTeam({teamId})
                if (team){
                    const offer = await getOfferById({offerId})
                    if (offer){
                        if(offer.toteam.id==team._id.toString() && (team.captain==user._id.toString() || team.cocaptain==user._id.toString())){
                            if (!offer.rejectteam){
                                const result = await teamAcceptOffer({offerId})
                                await checkTransfer({offerId})
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
                    res.status(400).json('Team not found')
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


export default withSessionRouter(teamAcceptOfferApi)