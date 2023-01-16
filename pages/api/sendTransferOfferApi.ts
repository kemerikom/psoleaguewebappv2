import { NextApiRequest, NextApiResponse } from "next";
import { getTeam, getTeamByUserId } from "../../utils/mongodb/getTeams";
import { getPlayer, getUserByUid } from "../../utils/mongodb/getUsers";
import { withSessionRouter } from "../../utils/src/ironSessionHandlers";


async function sendTransferOfferApi(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST'){
        const body = JSON.parse(req.body)
        const {userId} = body
        const userUid = req.session.user
        if (userUid && userUid.uid){
            const fromPlayer = await getUserByUid({uid:userUid.uid})
            if (fromPlayer){
                const fromTeamData = await getTeamByUserId({userId: fromPlayer?._id.toString()})
                if (fromTeamData){
                    const toPlayerData = await getPlayer({playerId: userId})
                    if (toPlayerData){
                        let toPlayer = {
                            id: toPlayerData._id.toString(),
                            username: toPlayerData.username,
                            avatar: toPlayerData.avatar?.medium
                        }
                        let fromTeam = {
                            id: fromTeamData._id.toString(),
                            name: fromTeamData.name,
                            logo: fromTeamData.logo
                        }
                        if (toPlayerData.teamid != 'free'){
                            const toTeamData = await getTeam({teamId: toPlayerData.teamid})
                            if (toTeamData){
                                let toTeam = {
                                    id: toTeamData._id.toString(),
                                    name: toTeamData.name,
                                    logo: toTeamData.logo
                                }
                                nonFreeAgent({toPlayer, toTeam, fromTeam})
                            }else{
                                let toTeam = {
                                    id: 'free',
                                    name: 'free',
                                    logo: 'free',
                                }
                                freeAgent({toPlayer, toTeam, fromTeam})
                            }

                        }else{
                            let toTeam = {
                                id: 'free',
                                name: 'free',
                                logo: 'free',
                            }
                            freeAgent({toPlayer, toTeam, fromTeam})
                        }
                    }else{
                        res.status(400).json('Player not found')
                    }
                }else{
                    res.status(400).json('Only captain or co-captain can send transfer offer')
                }
            }else{
                res.status(400).json('User not found')
            }

        }else{
            res.redirect('/auth/login').send('Please login')
        }
    }else{
        res.status(400).json('Connection failed')
    }
}

async function freeAgent({toPlayer, toTeam, fromTeam}: {toPlayer: {id:string, username:string, avatar?:string}, toTeam:{id:string, name: string, logo?:string}, fromTeam: {id:string, name:string, logo?:string}}) {
    
}

async function nonFreeAgent({toPlayer, toTeam, fromTeam}: {toPlayer: {id:string, username:string, avatar?:string}, toTeam:{id:string, name: string, logo?:string}, fromTeam: {id:string, name:string, logo?:string}}) {
    
}


export default withSessionRouter(sendTransferOfferApi)