import { NextApiRequest,NextApiResponse } from "next";
import { withIronSession,Session } from "next-iron-session";
import {updateTeamRoster,getTeam} from '../../utils/mongodb/getTeams'
import {getUserByUid} from '../../utils/mongodb/getUsers'

type NextIronRequest=NextApiRequest&{session:Session}


async function updateTeamRosterApi(req:NextIronRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const {teamId,roster,formation}=body
        const cookie = await req.session.get('user')
        if(cookie){
            const {uid}=cookie
            const user = await getUserByUid({uid})
            const team = await getTeam({teamId})
            if(user&&team){
                if(team.captain==user._id.toString()||team.cocaptain==user._id.toString()){
                    const result = await updateTeamRoster({teamId,roster,formation})
                    res.status(200).json(result)
                }else{
                    res.status(400).json('You have not permission.')
                }
            }else{
                res.status(400).json('Connection failed')
            }
        }else{
            res.status(400).json('Connection failed')
        }
    }else{
        res.status(400).json('Connection failed')
    }

    

}
export default withIronSession(updateTeamRosterApi,{
    cookieName:process.env.ironCookie,
    password:process.env.ironPassword,
    cookieOptions:{
        secure:process.env.NODE_ENV==='production'
    }
})