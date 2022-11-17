import { NextApiRequest,NextApiResponse } from "next";
import { getTeam } from "../../utils/mongodb/getTeams";

export default async function getTeamApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const {teamId}=body
        const result = await getTeam({teamId})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
}