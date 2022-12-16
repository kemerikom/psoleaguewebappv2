import { NextApiRequest,NextApiResponse } from "next";
import {withIronSession,Session} from 'next-iron-session'
import { getLeagueNameById } from "../../utils/mongodb/getLeagues";
import {insertMatches} from '../../utils/mongodb/getMatches'
import { getUserByUid } from "../../utils/mongodb/getUsers";

type NextIronRequest=NextApiRequest&{session:Session}

async function createScheduleApi(req:NextIronRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const cookie= await req.session.get('user')
        const {uid}=await cookie
        const user:any=await getUserByUid({uid})
        const leagues= await getLeagueNameById({_id:user._id.toString()})
        const {schedule,teams,leagueId}=body
        if(leagues.filter((l)=>l._id==leagueId)){
            const result = await insertMatches({schedule,teams,leagueId})
            res.status(200).json(result)
        }else{
            res.status(200).json('Connection failed')
        }

    }else{
        res.status(400).json('Connection failed')
    }
}


export default withIronSession(createScheduleApi,{
    password:process.env.ironPassword||'',
    cookieName:process.env.ironCookie||'',
    cookieOptions:{
        secure:process.env.NODE_ENV==='production'
    }
})