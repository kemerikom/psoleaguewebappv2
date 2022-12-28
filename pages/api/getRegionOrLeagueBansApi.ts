import { NextApiRequest, NextApiResponse } from "next";
import { banType } from "../../typings";
import { getRegionOrLeagueBans } from "../../utils/mongodb/getBans";

export default async function getRegionOrLeagueBansApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const {regionId,leagueId}=body
        const result = await getRegionOrLeagueBans({regionId,leagueId})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
    
}