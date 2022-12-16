import { NextApiRequest,NextApiResponse } from "next";
import { getLeagueMatches } from "../../utils/mongodb/getMatches";

export default async function getLeagueMatchesApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const {leagueId}=body
        const result = await getLeagueMatches({leagueId})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
    
}