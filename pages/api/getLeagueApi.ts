import {NextApiRequest,NextApiResponse} from 'next'
import { getLeague } from '../../utils/mongodb/getLeagues'

export default async function getLeagueApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const league=req.body
        const result= await getLeague({league})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
    
}