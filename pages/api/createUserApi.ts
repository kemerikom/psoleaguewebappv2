import { NextApiRequest,NextApiResponse } from "next";
import { createUser } from "../../utils/firebase/createUser";
import { findPlayerByUserName,createUserData } from "../../utils/mongodb/getUsers";

export default async function createuserApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const {username,email,password,country,mainpos,secondpos}=body.data
        const usernameCheck= await findPlayerByUserName({username})
        if(usernameCheck){
            res.status(400).json('This username already taken')
        }else{
            const userCheck= await createUser({email,password})
            if(!userCheck){
                res.status(400).json('Something went wrong.')
            }else{
                const userId=userCheck.user.uid
                const result = await createUserData({id:userId,username,country,mainpos,secondpos})
                res.status(200).json(result)
            }
        }
    }else{
        res.status(400).json('Connection failed')
    }
    
}