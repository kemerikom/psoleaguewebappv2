import { MongoClient, ObjectId } from "mongodb";
import { tableScheduleType,teamsType } from '../../typings'

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


export async function insertMatches({schedule,teams,leagueId}:{schedule:tableScheduleType[],teams:teamsType[],leagueId:string}){
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const matches=database.collection('matches')
        const data:any=schedule.map((s:tableScheduleType)=>{
            return{
                leagueId,
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
                hometeamlogo:teams.find((team)=>team.name==s.awayteam)?.logo,
            }
        })
        try {
            await matches.insertMany(data)
            const leagues=database.collection('leagues')
            await leagues.updateOne(
                {_id:new ObjectId(leagueId)},
                {$set:{alive:true}}
                )
        } catch (error) {
            
        }
        return data
    }finally{
        await client.close()
    }
}


export async function getLeagueMatches({leagueId}:{leagueId:string}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const matches=database.collection('matches')
        const data= matches.find({leagueId})
        const result = await data.toArray()
        return result
    }finally{
        await client.close()
    }
}

export async function updateRefreeAndDate({matchId,refreeId,refreeName,dateTime}:{matchId:string,refreeId:string|null,refreeName:string|null,dateTime:number|null}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const matches=database.collection('matches')
        const match= await matches.updateOne({_id:new ObjectId(matchId)},{
            $set:{
                refreeid:refreeId,
                refreename:refreeName,
                datetime:dateTime
            }
        })
        return match
    }finally{
        await client.close()
    }
}


export async function getMatchById({matchId}: {matchId: string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const matches=database.collection('matches')
        const match= await matches.findOne({_id: new ObjectId(matchId)})
        return match
    }catch (err) {
        return null
    }finally{
        await client.close()
    }
}