import { NextApiRequest,NextApiResponse } from "next";
import { getLeagueTeams } from "../../utils/mongodb/getTeams";

export default async function getLeagueTeamsApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const {leagueId}=body
        const result = await getLeagueTeams({leagueId})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
}