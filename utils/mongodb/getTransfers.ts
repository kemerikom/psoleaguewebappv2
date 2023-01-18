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


export async function transferPlyerToTeam({offer}:{offer: offerType}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const datetime = new Date().getTime()
        const database= client.db('psoleague')
        const transfers=database.collection('transfers')
        await transfers.insertOne({
            user: offer.toplayer,
            from: offer.fromteam,
            to: offer.toteam,
            datetime
        })
        await addPlayerToTeam({offer})
    }finally{
        await client.close()
    }
}

