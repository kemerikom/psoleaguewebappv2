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