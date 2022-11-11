import { NextApiRequest,NextApiResponse } from "next";
import { getLeagues } from "../../utils/mongodb/getLeagues";


export default async function getLeagueNamesApi(req:NextApiRequest,res:NextApiResponse){
    try {
        if(req.method=='POST'){
            const leagueNames= await getLeagues()
            const data = leagueNames.map((league)=>{
                return{
                    _id:league._id,
                    name:league.name,
                    color1:league.color1,
                    color2:league.color2,
                    fontcolor:league.fontcolor,
                    official:league.official
                }
            })
            res.status(200).json(data)
        }else{
            res.status(400).json('Connection Failed')
        }
    } catch (error) {
        res.status(400).json('Connection Failed')
    }
}