import {MongoClient, ObjectId} from 'mongodb'
import { leagueName } from '../../typings'

const client= new MongoClient(process.env.mongoUri)

export async function getLeagues() {
    try {
        await client.connect()
        const database=client.db('psoleague')
        const leagues=database.collection('leagues')
        const league= leagues.find()
        const result=await league.toArray()
        return result
    }finally{
        await client.close()
    }
}


export async function getIds() {
    try {
        await client.connect()
        const database=client.db('psoleague')
        const leagues=database.collection('leagues')
        const league=leagues.find({official:true})
        const data = await league.toArray()
        const result= data.map((d)=>{
            return{
                id:d._id.toString()
            }
        })
        return result
    }finally{
        await client.close()
    }
}

export async function getLeague({league}:{league:string}) {
    try {
        await client.connect()
        const database=client.db('psoleague')
        const leagues=database.collection('leagues')
        const leagueInfo=leagues.findOne({_id:(new ObjectId(league))})
        const data = await leagueInfo
        return data
    }finally{
        await client.close()
    }
}