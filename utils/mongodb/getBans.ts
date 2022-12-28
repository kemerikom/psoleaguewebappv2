import { MongoClient } from "mongodb";


export async function getRegionOrLeagueBans({regionId,leagueId}:{leagueId:string,regionId:string}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const bans = database.collection('bans')
        const ban = bans.find({$or:[{leagueid:leagueId},{regionid:regionId}]}).sort({username:-1})
        const result = await ban.toArray()
        return result
    }catch{
        await client.close()
    }
}