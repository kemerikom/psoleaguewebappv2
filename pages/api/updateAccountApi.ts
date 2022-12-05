import { NextApiRequest,NextApiResponse } from "next";
import { updateAccount } from "../../utils/mongodb/getUsers";
import {withIronSession,Session} from 'next-iron-session'
type NextIronRequest=NextApiRequest&{session:Session}

async function updateAccountApi(req:NextIronRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body = JSON.parse(req.body)
        const user = await req.session.get('user')
        const {uid,mainpos,secondpos,country} = body
        if(uid==user.uid){
            const result = await updateAccount({uid,mainpos,secondpos,country})
            res.status(200).json(result)
        }else{
            res.status(400).json('Connection failed')
        }
    }else{
        res.status(400).json('Connection failed')
    }
    
}


export default withIronSession(updateAccountApi,{
    password:process.env.ironPassword||'',
    cookieName:process.env.ironCookie||'',
    cookieOptions:{
        secure:process.env.NODE_ENV==="production"
    }
})