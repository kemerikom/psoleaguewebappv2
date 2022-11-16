import {MongoClient} from 'mongodb'



export async function getSeasons({leagueId}:{leagueId:string}) {
    const client= new MongoClient(process.env.mongoUri)
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


export async function getCurrenSeasons({leagueId}:{leagueId:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const seasons=database.collection('seasons')
        const season= seasons.find({leagueId,alive:true})
        const result= await season.toArray()
        return result
    }finally{
        await client.close()
    }
    
}