import { NextApiRequest,NextApiResponse } from "next";
import {withIronSession,Session} from 'next-iron-session'
import {getUserByUid}from '../../utils/mongodb/getUsers'
import {getLeagueNameById} from '../../utils/mongodb/getLeagues'

type NextIronRequest=NextApiRequest&{session:Session}


async function getLeaguesByUidApi(req:NextIronRequest,res:NextApiResponse):Promise<void> {
    try {
        const cookie= await req.session.get('user')
        const {uid}=await cookie
        const user:any=await getUserByUid({uid})
        const leagues= await getLeagueNameById({_id:user._id.toString()})
        res.status(200).json(leagues)
    } catch (error) {
        res.status(200).json(false)
    }


}


export default withIronSession(getLeaguesByUidApi,{
    password:process.env.ironPassword||'',
    cookieName:process.env.ironCookie||'',
    cookieOptions:{
        secure:process.env.NODE_ENV==='production'
    }
})