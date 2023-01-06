import {NextApiRequest,NextApiResponse} from 'next'
import {withIronSession,Session} from 'next-iron-session'
type NextIronRequest=NextApiRequest&{session:Session}

async function getUserUid(req:NextIronRequest,res:NextApiResponse):Promise<void>{
    const user= await req.session.get('user')
    if(user){
        res.status(200).json(user)
    }else{
        res.status(200).json(false)
    }

}

export default withIronSession(getUserUid,{
    password:process.env.ironPassword||'',
    cookieName:process.env.ironCookie||'',
    cookieOptions:{
        secure:process.env.NODE_ENV==="production"
    }
})
