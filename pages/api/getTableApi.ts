import { NextApiRequest,NextApiResponse } from "next";
import { getTable } from "../../utils/mongodb/getTables";

export default async function getTableApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const {seasonId}=JSON.parse(req.body)
        const tableData= await getTable({seasonId})
        res.status(200).json(tableData)
    }else{
        res.status(400).json('Connection Failed')
    }
    
}