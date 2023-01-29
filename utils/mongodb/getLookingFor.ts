import { MongoClient } from "mongodb";


export async function lookingForTeamList({page=1}: {page?: number}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database = client.db('psoleague')
        const lfts = database.collection('lookingforteam')
        const lft = await lfts.find().sort({datetime: -1}).limit(page*20).toArray()
        return lft
    }finally{
        await client.close()
    }
    
}