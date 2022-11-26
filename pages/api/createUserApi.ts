import { NextApiRequest,NextApiResponse } from "next";
import { createUser } from "../../utils/firebase/createUser";
import { findPlayerByUserName,createUserData } from "../../utils/mongodb/getUsers";

export default async function createuserApi(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=='POST'){
        const body=JSON.parse(req.body)
        const {username,email,password,country,mainpos,secpos}=body.data
        const usernameCheck= await findPlayerByUserName({username})
        if(usernameCheck){
            res.status(200).json(1)
        }else{
            const userCheck= await createUser({email,password})
            if(!userCheck){
                res.status(200).json(2)
            }else{
                const userId=userCheck.user.uid
                const result = await createUserData({id:userId,username,country,mainpos,secpos})
                res.status(200).json(result)
            }
            
        }
    }else{
        res.status(400).json('Connection failed')
    }
    
}