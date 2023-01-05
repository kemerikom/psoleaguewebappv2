import { NextApiRequest,NextApiResponse } from "next";
import { withIronSession,Session } from "next-iron-session";
import { getUserByUid,findPlayerByUserName } from "../../utils/mongodb/getUsers";
import {getLeague,addLeagueRefree} from '../../utils/mongodb/getLeagues'

type NextIronRequest=NextApiRequest&{session:Session}


async function addRefreeToLeagueApi(req:NextIronRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const cookie= await req.session.get('user')
        if(cookie){
            const {uid}= await cookie
            const {leagueId,userName}=body
            const user = await getUserByUid({uid})
            const league = await getLeague({league:leagueId})
            if(league&&user){
                if(league.mods.includes({id:user._id.toString(),username:user.username})||league.admins.includes({id:user._id.toString(),username:user.username})||league.owner==user._id.toString()){
                    const newReferee= await findPlayerByUserName({username:userName})
                    if(newReferee){
                        const result = await addLeagueRefree({leagueId,refreeId:newReferee._id.toString(),refreeUserName:newReferee.username})
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


export default withIronSession(addRefreeToLeagueApi,{
    cookieName:process.env.ironCookie||'',
    password:process.env.ironPassword||'',
    cookieOptions:{
        secure:process.env.NODE_ENV==='production'
    }
})