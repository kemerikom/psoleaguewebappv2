import { NextApiRequest,NextApiResponse } from "next";
import { getMatchByTeamId } from "../../utils/mongodb/getMatches";


export default async function getMatchesByTeamIdApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const {teamId}=body
        const result = await getMatchByTeamId({teamId})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
}