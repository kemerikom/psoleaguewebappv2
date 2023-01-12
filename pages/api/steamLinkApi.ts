import SteamAuth from 'node-steam-openid'
import { withIronSessionApiRoute} from 'iron-session/next'
import { NextApiRequest,NextApiResponse } from 'next'


const steam = new SteamAuth({
    realm:`${process.env.appPath}/api`,
    returnUrl:`${process.env.appPath}/api/steamDbApi`,
    apiKey: process.env.steamApiKey
})

async function steamLinkApi(req:NextApiRequest,res:NextApiResponse){
    const uid=req.session.user?.uid
    if(uid){
        const redirectUrl= await steam.getRedirectUrl()
        res.redirect(redirectUrl)
    }else{
        
    }


}


export default withIronSessionApiRoute(steamLinkApi,{
    cookieName:process.env.ironCookie,
    password:process.env.ironPassword,
    cookieOptions:{
        secure:process.env.NODE_ENV==='production'
    }
})