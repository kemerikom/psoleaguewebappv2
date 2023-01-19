import { NextApiRequest, NextApiResponse } from "next";
import { getTeamByUserId, kickPlayerFromTeam } from "../../utils/mongodb/getTeams";
import { getUserByUid } from "../../utils/mongodb/getUsers";
import { withSessionRouter } from "../../utils/src/ironSessionHandlers";

async function kickPlayerFromTeamApi(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == 'POST'){
        const body = JSON.parse(req.body)
        const {player} = body
        const userUid = req.session.user
        if (userUid && userUid.uid){
            const user = await getUserByUid({uid: userUid.uid})
            if (user){
                const team = await getTeamByUserId({userId: user._id.toString()})
                if (team){
                    const result = await kickPlayerFromTeam({teamId: team._id.toString(), player})
                    res.status(200).json(result)
                }else{
                    res.status(400).json('Team not found')
                }
            }else{
                res.status(400).json('User not found')
            }
        }else{
            res.redirect('/auth/login')
        }
    }else{
        res.status(400).json('Connection failed')
    }
}


export default withSessionRouter(kickPlayerFromTeamApi)