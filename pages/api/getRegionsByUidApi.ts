import {NextApiRequest,NextApiResponse} from 'next'
import { Session, withIronSession } from 'next-iron-session'
import { getRegionNamesById } from '../../utils/mongodb/getRegions'
import { getUserByUid } from '../../utils/mongodb/getUsers'

type NextIronRequest=NextApiRequest&{session:Session}


async function getRegionsByUidApi(req:NextIronRequest,res:NextApiResponse) {
    const cookie= await req.session.get('user')
    const {uid}=cookie
    const user:any=await getUserByUid({uid})
    const regions= await getRegionNamesById({_id:user._id.toString()})
    res.status(200).json(regions)
}


export default withIronSession(getRegionsByUidApi,{
    password:process.env.ironPassword||'',
    cookieName:process.env.ironCookie||'',
    cookieOptions:{
        secure:process.env.NODE_ENV==='production'
    }
})