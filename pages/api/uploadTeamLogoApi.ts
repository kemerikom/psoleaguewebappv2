import { NextApiRequest, NextApiResponse } from "next";
import { uploadTeamLogo } from "../../utils/firebase/uploadImage";
import { getTeamByUserId, updateTeamLogo } from "../../utils/mongodb/getTeams";
import { getUserByUid } from "../../utils/mongodb/getUsers";
import { withSessionRouter } from "../../utils/src/ironSessionHandlers";


async function uploadTeamLogoApi(req: NextApiRequest, res: NextApiResponse) {
    if (req.method=='POST'){
        const body = JSON.parse(req.body)
        const {image} = body
        const userUid = req.session.user
        if (userUid && userUid.uid){
            const user = await getUserByUid({uid:userUid.uid})
            if (user){
                const team = await getTeamByUserId({userId: user._id.toString()})
                if (team){
                    if(team.captain == user._id.toString()){
                        const resultUpload = await uploadTeamLogo({image, teamId:team._id.toString()})
                        if (resultUpload){
                            const resultUpdate = await updateTeamLogo({teamId: team._id.toString()})
                            res.status(200).json(resultUpdate)
                        }else{
                            res.status(400).json('Something went wrong')
                        }
                    }else{
                        res.status(400).json('Missing permission')
                    }
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


export default withSessionRouter(uploadTeamLogoApi)