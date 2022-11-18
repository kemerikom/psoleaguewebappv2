import { NextApiRequest,NextApiResponse } from "next";
import { getPlayerName } from "../../utils/mongodb/getUsers";

export default async function getUserNameApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body= JSON.parse(req.body)
        const {userId}=body
        const result = await getPlayerName({userId})
        res.status(200).json(result)
    }else{
        res.status(200).json('Connection failed')
    } 
}