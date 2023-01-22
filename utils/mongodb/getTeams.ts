import {MongoClient, ObjectId} from 'mongodb'
import { offerType, teamsType, transferType, userNameIdType } from '../../typings'
import { updatePlayerTeamId } from './getUsers'




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


export async function getTeamByUserId({userId}:{userId:string}):Promise<teamsType | null> {
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

export async function addPlayerToTeam({offer}: {offer: offerType}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const teams=database.collection('teams')
        await teams.updateOne({
            _id: new ObjectId(offer.fromteam.id)
        },{
            $addToSet:{
                players:{
                    id: offer.toplayer.id,
                    username: offer.toplayer.username
                }
            }
        })
    }finally{
        await client.close()
    }
    await updatePlayerTeamId({userId: offer.toplayer.id, teamId:offer.fromteam.id})
    if(offer.toteam){
        if (offer.toteam.id!='free'){
            await removePlayerToTeam({offer})
        }
    }
}

export async function removePlayerToTeam({offer}: {offer: offerType}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const teams=database.collection('teams')
        await teams.updateOne({
            _id: new ObjectId(offer.toteam?.id||'free')
        },{
            $pull:{
                players:{
                    id: offer.toplayer.id,
                    username: offer.toplayer.username
                }
            }
        })
    }finally{
        await client.close()
    }
}


export async function updateTeamLogo({teamId}: {teamId:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const teams=database.collection('teams')
        const team = await teams.updateOne({
            _id: new ObjectId(teamId)
        },{
            $set: {
                logo: `${teamId}.png`
            }
        })
        return team
    }finally{
        await client.close()
    }
}


export async function updateCoCaptain({teamId, userId}: {teamId: string, userId: string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const teams=database.collection('teams')
        const team = await teams.updateOne({
            _id: new ObjectId(teamId)
        },{
            $set: {
                cocaptain: userId
            }
        })
        return team
    }finally{
        await client.close()
    }
}


export async function kickPlayerFromTeam({teamId, player}: {teamId:string, player: userNameIdType}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const teams=database.collection('teams')
        const res = await teams.updateOne({
            _id: new ObjectId(teamId)
        },{
            $pull: {
                players:player
            }
        })
        const result = await updatePlayerTeamId({userId: player.id, teamId: 'free'})
        return result
    }finally{
        await client.close()
    }
}


export async function getTeamByFullName({teamName}: {teamName: string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database = client.db('psoleague')
        const teams = database.collection('teams')
        const team = await teams.findOne({name: teamName})
        return team
    }finally{
        await client.close()
    }
}


export async function createTeam({name, shortName, color1, color2, fontColor, captain, captainUserName ,origin}: {name: string, shortName:string, color1: string, color2: string, fontColor:string, captain: string, captainUserName: string, origin: string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database = client.db('psoleague')
        const teams = database.collection('teams')
        const team = await teams.insertOne({
            name,
            shortname: shortName,
            color1,
            color2,
            fontcolor: fontColor,
            captain,
            players: [{id: captain, username: captainUserName}],
            origin,
            teamsize: 8,
            formation: '313'
        })
        return team
    }finally{
        await client.close()
    }
}

export async function favTeam({teamId, userUid}: {teamId: string, userUid: string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const teams=database.collection('teams')
        const team = await teams.updateOne({_id: new ObjectId(teamId)},{
            $addToSet: {followers: userUid}
        })
        return team
    }finally{
        await client.close()
    }
}

export async function unFavTeam({teamId, userUid}: {teamId: string, userUid: string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const teams=database.collection('teams')
        const team = await teams.updateOne({_id: new ObjectId(teamId)},{
            $pull: {followers: userUid}
        })
        return team
    }finally{
        await client.close()
    }
}

export async function upVoteTeam({teamId, userUid}: {teamId: string, userUid: string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const teams=database.collection('teams')
        const team = await teams.updateOne({_id: new ObjectId(teamId)},{
            $addToSet: {upvote: userUid},
            $pull: {downvote: userUid}
        })
        return team
    }finally{
        await client.close()
    }
}

export async function unUpVoteTeam({teamId, userUid}: {teamId: string, userUid: string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const teams=database.collection('teams')
        const team = await teams.updateOne({_id: new ObjectId(teamId)},{
            $pull: {upvote: userUid},
        })
        return team
    }finally{
        await client.close()
    }
}


export async function downVoteTeam({teamId, userUid}: {teamId: string, userUid: string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const teams=database.collection('teams')
        const team = await teams.updateOne({_id: new ObjectId(teamId)},{
            $pull: {upvote: userUid},
            $addToSet: {downvote: userUid}
        })
        return team
    }finally{
        await client.close()
    }
}

export async function unDownVoteTeam({teamId, userUid}: {teamId: string, userUid: string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const teams=database.collection('teams')
        const team = await teams.updateOne({_id: new ObjectId(teamId)},{
            $pull: {downvote: userUid}
        })
        return team
    }finally{
        await client.close()
    }
}

export async function getFollowingTeams({uid}: {uid:string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const teams=database.collection('teams')
        const team = await teams.find({
            followers: {$in: [uid]}
        }).limit(30).toArray()
        return team
    }finally{
        await client.close()
    }
}