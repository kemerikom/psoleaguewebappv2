import { MongoClient } from 'mongodb'


export async function getTable({seasonId}:{seasonId:string}) {
    const client =  new MongoClient(process.env.mongoUri)
    try {
        await client.connect()
        const database=client.db('psoleague')
        const tables=database.collection('tables')
        const tableInfo=tables.findOne({seasonId})
        const data = await tableInfo
        return data
    }finally{
        await client.close()
    }
}


export async function getLeaguePreviousTables({leagueId}:{leagueId:string}) {
    const client = new MongoClient(process.env.mongoUri)
    try {
        await client.connect()
        const database=client.db('psoleague')
        const tables=database.collection('tables')
        const tableInfo=tables.find({leagueId})
        const result = await tableInfo.toArray()
        return result
    }finally{
        await client.close()
    }
}