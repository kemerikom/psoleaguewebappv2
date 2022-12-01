import { NextApiRequest,NextApiResponse } from "next";
import { getUserByUid } from "../../utils/mongodb/getUsers";

export default async function getUserByUidApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const {uid}=body
        const result = await getUserByUid({uid})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
    
}