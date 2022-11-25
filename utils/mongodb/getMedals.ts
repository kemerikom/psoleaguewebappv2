import { MongoClient } from "mongodb";


export async function getUserMedals({userId}:{userId:string}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const medals= database.collection('medals')
        const medalList=medals.find({userid:userId})
        const result = await medalList.toArray()
        return result
    }finally{
        await client.close()
    }
}