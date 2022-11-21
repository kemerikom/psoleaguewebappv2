import { MongoClient, ObjectId } from "mongodb";


export async function getMatchByTeamId({teamId}:{teamId:string}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const matches=database.collection('matches')
        const matchList=matches.find({$or:[{hometeamid:teamId},{awayteamid:teamId}]}).sort({datetime:1}).limit(10)
        const result= await matchList.toArray()
        return result
    }finally{
        await client.close()
    }
}