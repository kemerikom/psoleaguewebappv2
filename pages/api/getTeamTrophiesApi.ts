import { NextApiRequest,NextApiResponse } from "next";
import { getTeamTrophies } from "../../utils/mongodb/getTrophies";


export default async function getTeamTrophiesApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const {teamId}=body
        const result = await getTeamTrophies({teamId})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
}