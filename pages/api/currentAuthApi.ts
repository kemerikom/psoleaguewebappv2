import { NextApiRequest,NextApiResponse } from "next";
import { getCurrentUser } from "../../utils/firebase/getCurrentUser";

export default async function currentAuthApi(req:NextApiRequest,res:NextApiResponse) {
    const user = getCurrentUser()
    console.log('uid',user)
    res.status(200).json(user)
}