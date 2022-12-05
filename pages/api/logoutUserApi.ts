import { NextApiRequest,NextApiResponse } from "next";
import {loginUser} from '../../utils/firebase/loginUser'
import {withIronSession,Session} from 'next-iron-session'
import {logoutUser} from '../../utils/firebase/logoutUser'

type NextIronRequest=NextApiRequest&{session:Session}

async function LogoutUserApi(req:NextIronRequest,res:NextApiResponse):Promise<void> {
    if(req.method=='POST'){
        const result = await logoutUser()
        if(result){
            req.session.destroy()
            res.status(200).json(true)
        }else{
            res.status(400).json('Connection failed')
        }
    }else{
        res.status(400).json('Connection failed')
    }
}


export default withIronSession(LogoutUserApi,{
    password:process.env.ironPassword||'',
    cookieName:process.env.ironCookie||'',
    cookieOptions:{
        secure:process.env.NODE_ENV==="production"
    }
})