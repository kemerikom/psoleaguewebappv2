import {NextApiRequest,NextApiResponse} from 'next'

export default function Hello(req:NextApiRequest,res:NextApiResponse){
    console.log('Hello')
    res.status(200).json('merhaba')

}