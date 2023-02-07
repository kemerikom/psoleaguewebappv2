import { NextApiRequest, NextApiResponse} from "next";
import { lookingForTeamList } from "../../utils/mongodb/getLookingFor";


export default async function getLookingForTeamApi(req: NextApiRequest, res: NextApiResponse){
    if (req.method == 'POST'){
        const {page} = JSON.parse(req.body)
        const lfts = await lookingForTeamList({page})
        res.status(200).json(lfts)
    }else{
        res.status(400).json('Connection failed')
    }

}