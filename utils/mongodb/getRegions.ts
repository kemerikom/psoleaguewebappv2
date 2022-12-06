import {MongoClient} from 'mongodb'


export async function getRegionNamesById({_id}:{_id:string}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const regions = database.collection('regions')
        const regionInfo=regions.find({$or:[
            {admins:_id},
            {mods:_id}
        ]})
        const data = await regionInfo.toArray()
        const result= data.map((d)=>{
            return{
                _id:d._id,
                name:d.name,
                logo:d.logo
            }
        })
        return result
    }finally{
        await client.close()
    }
    
}