import { NextApiRequest,NextApiResponse } from "next";
import { getIds } from "../../utils/mongodb/getLeagues";

export default async function getLeagueIds(req:NextApiRequest,res:NextApiResponse) {
    try {
        const leagueIds= await getIds()
        const data=leagueIds.map((li)=>{
            return{
                id:li.id.toString()
            }
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json('Connection failed')
    }
}