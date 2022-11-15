import { NextApiRequest,NextApiResponse } from "next";
import { getTeams } from "../../utils/mongodb/getTeams";

export default async function getTeamsApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body= JSON.parse(req.body)
        const {teamId}=body
        const result= await getTeams({teamId})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
    
}