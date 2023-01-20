import SteamAuth from "node-steam-openid"
import { NextApiRequest,NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import { updatePlayerSteamId } from "../../utils/mongodb/getUsers"

const steam = new SteamAuth({
    realm:`${process.env.appPath}/api`,
    returnUrl:`${process.env.appPath}/api/steamDbApi`,
    apiKey: process.env.steamApiKey
})

async function steamDbApi(req:NextApiRequest,res:NextApiResponse){
    try {
        const user = await steam.authenticate(req)
        const uid=req.session.user?.uid
        if(user&&uid){
            const result = await updatePlayerSteamId({uid,steamId:user.steamid,avatar:user.avatar})
            if(result){
                res.status(200).redirect('/settings/steam')
            }else{
                res.status(400).redirect('/settings/steam')
            }
        }else{
            res.status(400).redirect('/settings/steam')
        }
    } catch (error) {
        res.status(400).redirect('/settings/steam')
    }
}


export default withIronSessionApiRoute(steamDbApi,{
    cookieName:process.env.ironCookie,
    password:process.env.ironPassword,
    cookieOptions:{
        secure:process.env.NODE_ENV==='production'
    }
})