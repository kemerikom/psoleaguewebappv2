import {MongoClient} from 'mongodb'


export async function getTable({seasonId}:{seasonId:string}) {
    const client= await new MongoClient(process.env.mongoUri)
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