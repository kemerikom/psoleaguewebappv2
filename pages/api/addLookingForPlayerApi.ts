import { NextApiRequest, NextApiResponse } from "next";
import { addLookingForPlayer, checkLookingForPlayer } from "../../utils/mongodb/getLookingFor";
import { getTeamByUserId } from "../../utils/mongodb/getTeams";
import { getUserByUid } from "../../utils/mongodb/getUsers";
import { withSessionRouter } from "../../utils/src/ironSessionHandlers";


async function addLookingForTeamApi(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST') {
        const userUid = req.session.user
        const { positions } = JSON.parse(req.body)
        if (userUid && userUid.uid) {
            const user = await getUserByUid({uid: userUid.uid})
            if (user) {
                const team = await getTeamByUserId({userId: user._id.toString()})
                if (team) {
                    const dateTime = new Date().getTime()
                    const check = await checkLookingForPlayer({teamId: team._id.toString(), dateTime})
                    if (check) {
                        const datetime = new Date().getTime()
                        const lfp = await addLookingForPlayer({
                            teamId: team._id.toString(),
                            positions,
                            datetime,
                            teamName: team.name,
                            teamLogo: team.logo || null
                        })
                        if (lfp){
                            res.status(200).json(lfp)
                        }else{
                            res.status(400).json('You have been already used looking for player.')
                        }
                    }else {
                        res.status(400).json('You can only update once every 12 hours')
                    }
                }else {
                    res.status(400).json('Only captains can look for players.')
                }
            }else {
                res.status(400).json('User not found.')
            }
        }else {
            res.status(400).json('You should logged in.')
        }
    }else {
        res.status(400).json('Connection failed.')
    }
}


export default withSessionRouter(addLookingForTeamApi)