import { NextApiRequest,NextApiResponse } from "next";
import { getTeamIds } from "../../utils/mongodb/getTeams";


export default async function getTeamIdsApi(req:NextApiRequest,res:NextApiResponse) {
    const result = await getTeamIds()
    res.status(200).json(result)
}