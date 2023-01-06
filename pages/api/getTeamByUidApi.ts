import { NextApiRequest,NextApiResponse } from "next";
import { withIronSession,Session } from "next-iron-session";
import {getUserByUid} from '../../utils/mongodb/getUsers'
import {getTeamByUserId} from '../../utils/mongodb/getTeams'

type NextIronRequest=NextApiRequest&{session:Session}

async function getTeamByUidApi(req:NextIronRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body = JSON.parse(req.body)
        const {uid}=body
        const user = await getUserByUid({uid})
        if(user){
            const result = await getTeamByUserId({userId:user._id.toString()})
            res.status(200).json(result)
        }else{
            res.status(400).json('Connection failed')
        }
    }else{
        res.status(400).json('Connection failed')
    }
}


export default withIronSession(getTeamByUidApi,{
    cookieName:process.env.ironCookie,
    password:process.env.ironPassword,
    cookieOptions:{
        secure:process.env.NODE_ENV==='production'
    }
})