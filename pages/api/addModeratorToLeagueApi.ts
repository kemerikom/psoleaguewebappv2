import {NextApiRequest,NextApiResponse} from 'next'
import { withIronSession,Session} from 'next-iron-session'
import { getUserByUid,findPlayerByUserName } from "../../utils/mongodb/getUsers";
import {getLeague,addLeagueModerator} from '../../utils/mongodb/getLeagues'

type NextIronRequest=NextApiRequest&{session:Session}

async function addModeratorToLeagueApi(req:NextIronRequest,res:NextApiResponse){
    if(req.method=='POST'){
        const body =JSON.parse(req.body)
        const cookie = await req.session.get('user')
        if(cookie){
            const {uid}= await cookie
            const {leagueId,userName}=body
            const user = await getUserByUid({uid})
            const league=await getLeague({league:leagueId})
            if(league&&user){
                if(league.admins.includes({id:user._id.toString(),username:user.username})||league.owner==user._id.toString()){
                    const newMod = await findPlayerByUserName({username:userName})
                    if(newMod){
                        const result = await addLeagueModerator({leagueId,userId:newMod._id.toString(),userName:newMod.username})
                        res.status(200).json(result)
                    }else{
                        res.status(400).json('Connection failed. Please try again later.')
                    }
                }else{
                    res.status(400).json('You have no permission.')
                }
            }else{
                res.status(400).json('League or user not found.')
            }
        }else{
            res.status(400).json('You are not logged in.')
        }
    }else{
        res.status(400).json('Connection failed.')
    }
}


export default withIronSession(addModeratorToLeagueApi,{
    cookieName:process.env.ironCookie||'',
    password:process.env.ironPassword||'',
    cookieOptions:{
        secure:process.env.NODE_ENV==='production'
    }
})