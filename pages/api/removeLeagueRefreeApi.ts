import { NextApiRequest,NextApiResponse } from "next";
import { withIronSession,Session} from "next-iron-session";
import { getLeague, removeLeagueRefree } from "../../utils/mongodb/getLeagues";
import { getUserByUid } from "../../utils/mongodb/getUsers"


type NextIronRequest=NextApiRequest&{session:Session}

async function removeLeagueRefreeApi(req:NextIronRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const cookie= await req.session.get('user')
        if(cookie){
            const {uid}= await cookie
            const user = await getUserByUid({uid})
            const {leagueId,refreeUserName,refreeId}=body
            const league= await getLeague({league:leagueId})
            if(league&&user){
                if(league.owner==user._id.toString()||league.admins.includes({id:user._id.toString(),username:user.username})||league.mods.includes({id:user._id.toString()})){
                    if(user._id!=refreeId){
                        const result = await removeLeagueRefree({leagueId,refreeUserName,refreeId})
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



export default withIronSession(removeLeagueRefreeApi,{
    cookieName:process.env.ironCookie||'',
    password:process.env.ironPassword||'',
    cookieOptions:{
        secure:process.env.NODE_ENV==='production'
    }
})