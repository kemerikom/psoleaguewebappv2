import {MongoClient, ObjectId} from 'mongodb'

const client= new MongoClient(process.env.mongoUri)

export async function getSeasons({leagueId}:{leagueId:string}) {
    try{
        await client.connect()
        const database=client.db('psoleague')
        const seasons=database.collection('seasons')
        const season= seasons.find({leagueId})
        const result = await season.toArray()
        return result
    }finally{
        await client.close()
    }
}