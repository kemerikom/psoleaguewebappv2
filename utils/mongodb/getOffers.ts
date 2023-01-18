import { MongoClient, ObjectId } from "mongodb";
import { offerType } from "../../typings";
import { transferPlyerToTeam } from "./getTransfers";


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


export async function sendTransferOffer({toPlayer, fromTeam, toTeam, acceptTeam=false}: {toPlayer:{id:string, username:string, avatar?:string}, fromTeam:{id:string, name:string, logo?:string}, toTeam:{id:string, name:string, logo?:string}, acceptTeam?:boolean}) {
    const client = new MongoClient(process.env.mongoUri)
    const datetime = new Date().getTime()
    try{
        await client.connect()
        const database = client.db('psoleague')
        const offers = database.collection('offers')
        const result = await offers.insertOne({
            fromteam: fromTeam,
            toteam: toTeam,
            toplayer: toPlayer,
            acceptplayer: false,
            acceptteam: acceptTeam,
            rejectplayer: false,
            rejectteam: false,
            datetime: datetime,
            bot: false
        })
        return result
    }finally{
        await client.close()
    }
}


export async function checkTransfer( {offerId}: {offerId:string}){
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database = client.db('psoleague')
        const offers = database.collection('offers')
        const offerData = await offers.findOne({_id: new ObjectId(offerId)})
        if(offerData){
            const offer:offerType={
                _id: offerData?._id.toString(),
                fromteam: offerData.fromteam,
                toplayer: offerData.toplayer,
                acceptplayer: offerData.acceptplayer,
                acceptteam: offerData.acceptteam,
                rejectplayer: offerData.rejectplayer,
                rejectteam: offerData.rejectteam,
                bot: offerData.bot,
                datetime: offerData.datetime,
                toteam: offerData.toteam
            }
            if(offer.acceptplayer && offer.acceptteam){
                await transferPlyerToTeam({offer})
            }
        }
    }finally{
        await client.close()
    }
}