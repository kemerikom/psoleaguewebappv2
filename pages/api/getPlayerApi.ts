import { NextApiRequest,NextApiResponse } from "next";
import { getPlayer } from "../../utils/mongodb/getUsers";

export default async function getPlayerApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const {playerId}=body
        const result= await getPlayer({playerId})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
    
}