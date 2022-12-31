import { NextApiRequest,NextApiResponse} from "next";
import { withIronSession,Session } from "next-iron-session";
import { getUserByUid,findPlayerByUserName } from "../../utils/mongodb/getUsers";
import {getLeague,addLeagueAdmin} from '../../utils/mongodb/getLeagues'


type NextIronRequest=NextApiRequest&{session:Session}


async function addAdminToLeagueApi(req:NextIronRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const cookie= await req.session.get('user')
        if(cookie){
            const {uid}= await cookie
            const user = await getUserByUid({uid})
            const {leagueId,userName} =body
            const league= await getLeague({league:leagueId})
            if(league&&user){
                if(league.owner==user?._id){
                    const newAdmin= await findPlayerByUserName({username:userName})
                    if(newAdmin){
                        const result = await addLeagueAdmin({leagueId,userId:newAdmin._id.toString(),userName:newAdmin.username})
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


export default withIronSession(addAdminToLeagueApi,{
    cookieName:process.env.ironCookie||'',
    password:process.env.ironPassword||'',
    cookieOptions:{
        secure:process.env.NODE_ENV==='production'
    }

})