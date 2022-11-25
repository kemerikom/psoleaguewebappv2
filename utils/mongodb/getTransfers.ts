import { MongoClient, ObjectId } from "mongodb";



export async function getTransferByUserId({userId}:{userId:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const transfers=database.collection('transfers')
        const transferList=transfers.find({userid:userId})
        const result= await transferList.toArray()
        return result
    }finally{
        await client.close()
    }
}