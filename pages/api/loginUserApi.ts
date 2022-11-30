import { NextApiRequest,NextApiResponse } from "next";
import {loginUser} from '../../utils/firebase/loginUser'


export default async function loginUserApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method='POST'){
        const body=JSON.parse(req.body)
        const {email,password}=body
        const result = await loginUser({email,password})
        res.status(200).json(result)
    }else{
        res.status(400).json('Connection failed')
    }
    
}