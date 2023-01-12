import { NextApiRequest,NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { updatePlayerDiscordId } from "../../utils/mongodb/getUsers";


const apiEndpoint = process.env.discordApiEndpoint
const clientId = process.env.discordClientId
const clientSecret = process.env.discordClientSecret
const redirectUri = `${process.env.appPath}/api/discordRedirectApi`


async function discordRedirectApi(req:NextApiRequest,res:NextApiResponse) {
    const {code}= req.query
    if(code){
        const uid=req.session.user?.uid
        if(uid){
            try {
                const params = new URLSearchParams()
                params.append('client_id',clientId)
                params.append('client_secret',clientSecret)
                params.append('grant_type', 'authorization_code')
                params.append('code',code.toString())
                params.append('redirect_uri',redirectUri)
                const result = await fetch(`${apiEndpoint}/oauth2/token`,{
                    method:'POST',
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    body:params
                })
                const resData= await result.json()
                const {access_token}= resData
                if(access_token){
                    const result = await fetch(`${apiEndpoint}/users/@me`,{
                        method:'GET',
                        headers:{'Authorization':`Bearer ${access_token}`}
            
                    })
                    const resData= await result.json()
                    const resUpdate= await updatePlayerDiscordId({uid,discordId:resData.id,discordName:`${resData.username}#${resData.discriminator}`})
                    res.status(200).redirect('/settings/discord')
                }else{
                    res.status(400).redirect('/settings/discord')
                }
            } catch (error) {
                res.status(400).redirect('/settings/discord')
            }

        }else{
            res.status(400).redirect('/auth/login')
        }

    }else{
        res.status(400).redirect('/settings/discord')
    }
}


export default withIronSessionApiRoute(discordRedirectApi,{
    cookieName:process.env.ironCookie,
    password:process.env.ironPassword,
    cookieOptions:{
        secure:process.env.NODE_ENV==='production'
    }
})
