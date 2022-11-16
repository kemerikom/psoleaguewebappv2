import { NextApiRequest,NextApiResponse } from "next";
import { searchTeams } from "../../utils/mongodb/getTeams";

export default async function searchTeamApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body= JSON.parse(req.body)
        const {term}=body
        const result=await searchTeams({term})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
    
}