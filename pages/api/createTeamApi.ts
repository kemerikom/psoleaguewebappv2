import { NextApiRequest, NextApiResponse } from "next";
import { createTeam, getTeamByFullName } from "../../utils/mongodb/getTeams";
import { getUserByUid, updatePlayerTeamId } from "../../utils/mongodb/getUsers";
import { withSessionRouter } from "../../utils/src/ironSessionHandlers";


async function createTeamApi(req: NextApiRequest, res:NextApiResponse) {
    if (req.method == 'POST') {
        const body = JSON.parse(req.body)
        const userUid = req.session.user
        if (userUid && userUid.uid){
            const user = await getUserByUid({uid: userUid.uid})
            if (user){
                if (user.teamid == 'free'){
                    const {teamName, shortName, color1, color2, fontColor, origin } = body
                    const team = await getTeamByFullName({teamName})
                    if (!team){
                        const result = await createTeam({
                            name: teamName,
                            shortName: shortName,
                            color1,
                            color2,
                            fontColor: fontColor,
                            captain: user._id.toString(),
                            captainUserName: user.username,
                            origin,
                        })
                        if (result.acknowledged){
                            const resTeam = await updatePlayerTeamId({userId: user._id.toString(), teamId: result.insertedId.toString()})
                            res.status(200).json(resTeam)
                        }else{
                            res.status(400).json('Something went wrong')
                        }
                    }else{
                        res.status(400).json('This team name already taken')
                    }
                    res.status(200).json(team)
                }else{
                    res.status(400).json('User has team')
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


export default withSessionRouter(createTeamApi)