import { NextApiRequest,NextApiResponse } from "next";
import { withIronSession,Session } from "next-iron-session";
import { getLeague, removeLeagueModerator } from "../../utils/mongodb/getLeagues";
import { getUserByUid } from "../../utils/mongodb/getUsers"

type NextIronRequest=NextApiRequest&{session:Session}


async function removeLeagueModeratorApi(req:NextIronRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const cookie= await req.session.get('user')
        if(cookie){
            const {uid} = await cookie
            const user = await getUserByUid({uid})
            const {leagueId,moderatorUserName,moderatorId}=body
            const league= await getLeague({league:leagueId})
            if(league&&user){
                if(league.owner==user._id.toString()||league.admins.includes({id:user._id.toString(),username:user.username})){
                    if(user._id!=moderatorId){
                        const result = await removeLeagueModerator({leagueId,moderatorUserName,moderatorId})
                        res.status(200).json(result)
                    }else{
                        res.status(200).json('Connection failed')
                    }
                }else{
                    res.status(200).json('Connection failed')
                }
            }else{
                res.status(200).json('Connection failed')
            }
        }else{
            res.status(200).json('Connection failed')
        }
    }else{
        res.status(400).json('Connection failed')
    }
}


export default withIronSession(removeLeagueModeratorApi,{
    cookieName:process.env.ironCookie||'',
    password:process.env.ironPassword||'',
    cookieOptions:{
        secure:process.env.NODE_ENV==='production'
    }
})