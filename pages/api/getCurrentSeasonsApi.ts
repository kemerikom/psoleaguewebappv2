import { NextApiRequest,NextApiResponse } from "next";
import { getCurrenSeasons } from "../../utils/mongodb/getSeasons";

export default async function getCurrentSeasonsApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const {leagueId}=body
        const result= await getCurrenSeasons({leagueId})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
    
}