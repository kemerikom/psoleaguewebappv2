import { MongoClient, ObjectId } from "mongodb";
import { offerType } from "../../typings";
import { addPlayerToTeam } from "./getTeams";


export async function getTransferByUserId({userId}:{userId:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const transfers=database.collection('transfers')
        const transferList=transfers.find({userid:userId})
        const result= await transferList.toArray()
        return result
    }finally{
        await client.close()
    }
}


export async function transferPlayerToTeam({offer}:{offer: offerType}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const datetime = new Date().getTime()
        const database= client.db('psoleague')
        const transfers=database.collection('transfers')
        await transfers.insertOne({
            user: offer.toplayer,
            from: offer.toteam,
            to: offer.fromteam,
            datetime
        })
        await addPlayerToTeam({offer})
    }finally{
        await client.close()
    }
}


export async function getLastTransfers() {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const transfers=database.collection('transfers')
        const transfer = await transfers.find().sort({datetime: -1}).limit(30).toArray()
        return transfer
    }finally{
        await client.close()
    }
}

