import { NextApiRequest, NextApiResponse } from "next";
import { favPlayer } from "../../utils/mongodb/getUsers";
import { withSessionRouter } from "../../utils/src/ironSessionHandlers";


async function favPlayerApi(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST'){
        const body = JSON.parse(req.body)
        const userUid = req.session.user
        if (userUid && userUid.uid){
            const {playerId} = body
            if (playerId){
                const result = await favPlayer({playerId, userUid: userUid.uid})
                res.status(200).json(result)
            }else{
                res.status(400).json('Player not found')
            }
        }else{
            res.status(400).json('Please login')
        }
    }else{
        res.status(400).json('Connection failed')
    }
}


export default withSessionRouter(favPlayerApi)