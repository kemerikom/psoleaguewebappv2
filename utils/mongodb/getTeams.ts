import {MongoClient, ObjectId} from 'mongodb'



export async function getTeam({teamId}:{teamId:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const teams= database.collection('teams')
        const teamList=teams.findOne({_id:(new ObjectId(teamId))})
        const result= await teamList
        return result
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


export async function getTeamByUserId({userId}:{userId:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const teams= database.collection('teams')
        const teamList=teams.findOne({$or:[{captain:userId},{cocaptain:userId}]})
        const result= await teamList
        return result
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