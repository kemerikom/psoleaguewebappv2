import { NextApiRequest, NextApiResponse } from "next";
import { addLookingForTeam, checkLookingForTeamTime } from "../../utils/mongodb/getLookingFor";
import { getUserByUid } from "../../utils/mongodb/getUsers";
import { withSessionRouter } from "../../utils/src/ironSessionHandlers";


async function addLookingForTeamApi(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST'){
        const user = req.session.user
        let dateTime = new Date().getTime()
        if (user && user.uid) {
            const userData = await getUserByUid({uid: user.uid})
            if (userData){
                const check = await checkLookingForTeamTime({userId: userData._id.toString(), dateTime})
                if (check) {
                    const lft = await addLookingForTeam({
                        userName: userData.username,
                        userId: userData._id.toString(),
                        avatar: userData.avatar.medium,
                        country: userData.country,
                        mainPos: userData.mainpos,
                        secPos: userData.secondpos,
                        datetime: dateTime
                    })
                    res.status(200).json(lft)
                }else{
                    res.status(400).json('You can only update once every 12 hours')
                }
            }else{
                res.status(400).json('User not found')
            }
        }else{
            res.status(400).json('You must logged in')
        }
    }else{
        res.status(400).json('Connection failed')
    }

}

export default withSessionRouter(addLookingForTeamApi)