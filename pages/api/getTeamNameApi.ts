import { NextApiRequest,NextApiResponse } from "next";
import { teamsType } from "../../typings";
import { getTeam } from "../../utils/mongodb/getTeams";

export default async function getTeamNameApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body= JSON.parse(req.body)
        const {teamId}=body
        const team = await getTeam({teamId})
        const result= {
            _id:team?._id,
            name:team?.name,
            shortname:team?.shortname
        }
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
    
}