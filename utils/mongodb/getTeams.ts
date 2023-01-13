import {MongoClient, ObjectId} from 'mongodb'
import { teamsType } from '../../typings'



export async function getTeam({teamId}:{teamId:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const teams= database.collection('teams')
        const teamList=teams.findOne({_id:(new ObjectId(teamId))})
        const result= await teamList
        return result
    }
    catch (err){
        return false
    }finally{
        await client.close()
    }
}

export async function getLeagueTeams({leagueId}:{leagueId:string}){
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const teams= database.collection('teams')
        const teamList=teams.find({leagues:[leagueId]})
        const result= await teamList.toArray()
        return result
    }finally{
        await client.close()
    }
}

export async function searchTeams({term}:{term:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const teams= database.collection('teams')
        const teamList=teams.find({$or:[{name:new RegExp(term,'i')},{shortname:new RegExp(term,'i')}]})
        const result = await teamList.toArray()
        return result
    }finally{
        await client.close()
    }
}


export async function getTeamByUserId({userId}:{userId:string}):Promise<teamsType|null> {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const teams= database.collection('teams')
        const teamList=teams.findOne({$or:[{captain:userId},{cocaptain:userId}]})
        const data= await teamList
        if(data){
            const result:teamsType={
                _id:data._id.toString(),
                name:data.name,
                shortname:data.shortname,
                color1:data.color1,
                color2:data.color2,
                fontcolor:data.fontcolor,
                logo:data.logo,
                leagues:data?.leagues,
                players:data?.players,
                origin:data.origin,
                formation:data?.formation,
                roster:data?.roster,
                captain:data.captain,
                cocaptain:data?.cocaptain
            }
            return result
        }else{
            return null
        }
    }finally{
        await client.close()
    }
}


export async function updateTeamRoster({teamId,roster,formation}:{teamId:string,roster:number[],formation:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const teams=database.collection('teams')
        const result=await teams.findOneAndUpdate({_id:new ObjectId(teamId)},{$set:{
            formation,
            roster
        }})
        return result
    }finally{
        await client.close()
    }
}


export async function getTeamIds() {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const teams=database.collection('teams')
        const data = await teams.find().toArray()
        const result = data.map((d)=>{
            return{
                _id:d._id.toString()
            }
        })
        return result
    }finally{
        await client.close()
    }
}


export async function getTeamByPlayer({userId}:{userId:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const teams=database.collection('teams')
        const data = await teams.findOne({'players.id':userId})
        return data        
    }finally{
        await client.close()
    }
}