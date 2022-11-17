import { NextApiRequest,NextApiResponse } from "next";
import { getPlayersName } from "../../utils/mongodb/getUsers";

export default async function getPlayerNamesApi (req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const {teamId}=body
        const result = await getPlayersName({teamId})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
    
}