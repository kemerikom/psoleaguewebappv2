import { MongoClient, ObjectId } from "mongodb";


export async function getTeamTrophies({teamId}:{teamId:string}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const trophies= database.collection('trophies')
        const trophyList= trophies.find({teamid:teamId})
        const result = await trophyList.toArray()
        return result
    }finally{
        await client.close()
    }
    
}