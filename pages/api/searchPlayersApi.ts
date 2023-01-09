import { NextApiRequest,NextApiResponse } from "next";
import { searchPlayers } from "../../utils/mongodb/getUsers";


export default async function searchPlayersApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body = JSON.parse(req.body)
        const {term}=body
        const result = await searchPlayers({term})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
    
}