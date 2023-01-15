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


export async function playerAcceptOffer({offerId}: {offerId: string}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database = client.db('psoleague')
        const offers = database.collection('offers')
        const result = await offers.findOneAndUpdate({_id: new ObjectId(offerId)},{
            $set: {
                acceptplayer: true
            }
        })
        return result
    }finally{
        await client.close()
    }
}


export async function playerRejectOffer({offerId}: {offerId: string}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database = client.db('psoleague')
        const offers = database.collection('offers')
        const result = await offers.findOneAndUpdate({_id: new ObjectId(offerId)},{
            $set: {
                rejectplayer: true
            }
        })
        return result
    }finally{
        await client.close()
    }
}


export async function teamAcceptOffer({offerId}: {offerId: string}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database = client.db('psoleague')
        const offers = database.collection('offers')
        const result = await offers.findOneAndUpdate({_id: new ObjectId(offerId)},{
            $set: {
                acceptteam: true
            }
        })
        return result
    }finally{
        await client.close()
    }
}

export async function teamRejectOffer({offerId}: {offerId: string}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database = client.db('psoleague')
        const offers = database.collection('offers')
        const result = await offers.findOneAndUpdate({_id: new ObjectId(offerId)},{
            $set: {
                rejectteam: true
            }
        })
        return result
    }finally{
        await client.close()
    }
}