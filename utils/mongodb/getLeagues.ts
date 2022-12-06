import {MongoClient, ObjectId} from 'mongodb'
import { leagueName } from '../../typings'



export async function getLeagues() {
    const client= new MongoClient(process.env.mongoUri)
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
    const client= new MongoClient(process.env.mongoUri)
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
    const client= new MongoClient(process.env.mongoUri)
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

export async function getLeagueNameById({_id}:{_id:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const leagues=database.collection('leagues')
        const leagueInfo= leagues.find({$or:[
            {admins:_id},
            {mods:_id}
        ]})
        const data = await leagueInfo.toArray()
        const result= data.map((d)=>{
            return{
                _id:d._id,
                name:d.name,
                logo:d.logo
            }
        })
        return result
    }finally{

    }
}