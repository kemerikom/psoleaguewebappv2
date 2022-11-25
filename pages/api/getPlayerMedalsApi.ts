import { NextApiRequest,NextApiResponse } from "next";
import { getUserMedals } from "../../utils/mongodb/getMedals";

export default async function getPlayerMedalsApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const {userId}=body
        const result= await getUserMedals({userId})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
}