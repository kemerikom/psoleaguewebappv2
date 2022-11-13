import { NextApiRequest,NextApiResponse } from "next";
import { getSeasons } from "../../utils/mongodb/getSeasons";

export default async function getSeasonsApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method='POST'){
        const {leagueId}=JSON.parse(req.body)
        const data= await getSeasons({leagueId})
        res.status(200).json(data)
    }else{
        res.status(200).json('Connection failed')
    }
    
}