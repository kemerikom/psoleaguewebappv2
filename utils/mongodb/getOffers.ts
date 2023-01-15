import { MongoClient, ObjectId } from "mongodb";


export async function getOfferIds() {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database = client.db('psoleague')
        const offers = database.collection('offers')
        const data = await offers.find().toArray()
        const result = data.map((d) => {
            return {
                id: d._id.toString()
            }
        })
        return result
    }finally{
        await client.close()
    }
}


export async function getOfferById({offerId}: {offerId:string}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database = client.db('psoleague')
        const offers = database.collection('offers')
        const result = await offers.findOne({_id: new ObjectId(offerId)})
        return result
    }finally{
        await client.close()
    }
    
}