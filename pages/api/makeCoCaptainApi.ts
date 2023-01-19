import { NextApiRequest, NextApiResponse } from "next";
import { getTeamByUserId, updateCoCaptain } from "../../utils/mongodb/getTeams";
import { getUserByUid } from "../../utils/mongodb/getUsers";
import { withSessionRouter } from "../../utils/src/ironSessionHandlers";

async function makeCocaptainApi(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST'){
        const body = JSON.parse(req.body)
        const {userId} = body
        const userUid = req.session.user
        if (userUid && userUid.uid){
            const user = await getUserByUid({uid: userUid.uid})
            if (user){
                const team = await getTeamByUserId({userId: user._id.toString()})
                if (team){
                    const result = await updateCoCaptain({userId, teamId: team._id.toString()})
                    res.status(200).json(result)
                }else{
                    res.status(400).json('Missing permission')
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


export default withSessionRouter(makeCocaptainApi)