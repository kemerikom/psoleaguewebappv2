import { NextApiRequest,NextApiResponse } from "next";
import { withIronSession,Session } from "next-iron-session";
import { getLeagueNameById } from "../../utils/mongodb/getLeagues";
import { updateRefreeAndDate } from "../../utils/mongodb/getMatches";
import { getUserByUid } from "../../utils/mongodb/getUsers";

type NextIronRequest=NextApiRequest&{session:Session}


async function updateMatchApi(req:NextIronRequest,res:NextApiResponse){
    if(req.method=='POST'){
        const cookie= await req.session.get('user')
        const {uid}=cookie
        const body=JSON.parse(req.body)
        const {leagueId,matchId,refreeId,refreeName,dateTime}=body
        const user:any=await getUserByUid({uid})
        const league=await getLeagueNameById({_id:user._id.toString()})
        const secure=league.filter((l)=>l._id.toString()==leagueId)
        if(secure.length==0){
            res.status(200).json('Connection failed')
        }else{
            const result = await updateRefreeAndDate({matchId,refreeId,refreeName,dateTime})
            res.status(200).json(result)
        }
    }else{
        res.status(400).json('Connection failed')
    }

}

export default withIronSession(updateMatchApi,{
    password:process.env.ironPassword||'',
    cookieName:process.env.ironCookie||'',
    cookieOptions:{
        secure:process.env.NODE_ENV==='production'
    }

})