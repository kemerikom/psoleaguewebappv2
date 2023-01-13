import { NextApiRequest,NextApiResponse } from "next";
import {loginUser} from '../../utils/firebase/loginUser'
import {withIronSession,Session} from 'next-iron-session'

type NextIronRequest=NextApiRequest&{session:Session}


async function loginUserApi(req:NextIronRequest,res:NextApiResponse):Promise<void> {
    if(req.method='POST'){
        const body=JSON.parse(req.body)
        const {email,password}=body
        const result = await loginUser({email,password})
        if(result){
            req.session.set('user',{
                uid:result.user.uid
            })
            await req.session.save()
            res.status(200).json(result)
        }else{
            res.status(400).json('Wrong credentials')
        }

    }else{
        res.status(400).json('Connection failed')
    }
}

export default withIronSession(loginUserApi,{
    password:process.env.ironPassword||'',
    cookieName:process.env.ironCookie||'',
    cookieOptions:{
        secure:process.env.NODE_ENV==="production"
    }
})