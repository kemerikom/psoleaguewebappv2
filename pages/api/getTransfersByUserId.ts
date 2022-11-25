import { NextApiRequest,NextApiResponse } from "next";
import { getTransferByUserId } from "../../utils/mongodb/getTransfers";

export default async function getTransfersByUserId(req:NextApiRequest,res:NextApiResponse) {
    if(req.method='POST'){
        const body=JSON.parse(req.body)
        const {userId}=body
        const result = await getTransferByUserId({userId})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
    
}