import { MongoClient, ObjectId } from "mongodb";
import { tableScheduleType,matchType,teamsType } from '../../typings'

export async function getMatchByTeamId({teamId}:{teamId:string}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const matches=database.collection('matches')
        const matchList=matches.find({$or:[{hometeamid:teamId},{awayteamid:teamId}]}).sort({datetime:1}).limit(10)
        const result= await matchList.toArray()
        return result
    }finally{
        await client.close()
    }
}


export async function insertMatches({schedule,teams}:{schedule:tableScheduleType[],teams:teamsType[]}){
    const client = await new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const matches=database.collection('matches1')
        const data:any=schedule.map((s:tableScheduleType)=>{
            return{
                hometeamid:teams.find((team)=>team.name==s.hometeam)?._id,
                awayteamid:teams.find((team)=>team.name==s.awayteam)?._id,
                hometeamname:s.hometeam,
                awayteamname:s.awayteam,
                hometeamscore:s.homescore,
                awayteamscore:s.awayscore,
                refreeid:null,
                refreename:null,
                completed:false,
                datetime:s.datetime,
                awayteamlogo:teams.find((team)=>team.name==s.hometeam)?.logo,
                hometeamlogo:teams.find((team)=>team.name==s.awayteam)?.logo
            }
        })
        
    }finally{
        await client.close()
    }
}