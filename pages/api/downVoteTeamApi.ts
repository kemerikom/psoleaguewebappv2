import { NextApiRequest, NextApiResponse } from "next";
import { downVoteTeam } from "../../utils/mongodb/getTeams";
import { withSessionRouter } from "../../utils/src/ironSessionHandlers";


async function downVoteTeamApi(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST'){
        const body = JSON.parse(req.body)
        const userUid = req.session.user
        if (userUid && userUid.uid){
            const {teamId} = body
            if (teamId){
                const result = await downVoteTeam({teamId, userUid: userUid.uid})
                res.status(200).json(result)
            }else{
                res.status(400).json('Team not found')
            }
        }else{
            res.status(400).json('Please login')
        }
    }else{
        res.status(400).json('Connection failed')
    }
}


export default withSessionRouter(downVoteTeamApi)