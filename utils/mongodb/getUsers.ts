import { MongoClient, ObjectId, WithId } from "mongodb";
import { playerType } from "../../typings";


export async function getPlayersName({teamId}:{teamId:string[]}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const users=database.collection('users')
        const userList=users.find({teamid:teamId})
        const list= await userList.toArray()
        const result= list.map((l)=>{
            return{
                _id:l._id,
                username:l.username
            }
        })
        return result
    }finally{
        await client.close()
    }
}

export async function getPlayer({playerId}:{playerId:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const users= database.collection('users')
        const userList=users.findOne({_id:(new ObjectId(playerId))})
        const result= await userList
        return result
    }finally{
        await client.close()
    }
    
}

export async function getPlayerName({userId}:{userId:string}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const users=database.collection('users')
        const userList=users.findOne({_id:(new ObjectId(userId))})
        const result= await userList
        return result
    }finally{
        await client.close()
    }
}

export async function findPlayerByUserName({username}:{username:string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const users=database.collection('users')
        const userList=users.findOne({username})
        const result= await userList
        return result
    }finally{
        await client.close()
    }
}

export async function createUserData({id,username,country,mainpos,secondpos}:{id:string,username:string,country:string,mainpos:string,secondpos:string}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const users=database.collection('users')
        const user = await users.insertOne({
            uid:id,
            username,
            country,
            mainpos,
            secondpos,
            teamid:'free'
        })
        return user
    }finally{
        await client.close()
    }
}


export async function getUserByUid({uid}:{uid:string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const users=database.collection('users')
        const user =  users.findOne({uid})
        const result = await user
        return result
    }finally{
        await client.close()
    }
}


export async function updateAccount({uid,mainpos,secondpos,country}:{uid:string,mainpos:string,secondpos:string,country:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const users=database.collection('users')
        const user = await  users.updateOne({uid},{
            $set:{
                mainpos,
                secondpos,
                country
            }
        })
        const result = user
        return result
    }finally{
        await client.close()
    }
}


export async function getPlayerIds() {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const users=database.collection('users')
        const userList=users.find()
        const result= await userList.toArray()
        return result
    }finally{
        await client.close()
    }
}


export async function searchPlayers({term}:{term:string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const players=database.collection('users')
        const playerList= players.find({username:new RegExp(term,'i')})
        const result = await playerList.toArray()
        return result
    }finally{
        await client.close()
    }
   
}


export async function updatePlayerSteamId({uid,steamId,avatar}:{uid:string,steamId:string,avatar:{small:string,medium:string,large:string}}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const players=database.collection('users')
        const result = await players.findOneAndUpdate({uid},{$set:{
            steamid:steamId,
            avatar
        }})
        return result
    }finally{
        await client.close()
    }
}


export async function updatePlayerDiscordId({uid,discordId,discordName}:{uid:string,discordId:string,discordName:string}){
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const players=database.collection('users')
        const result = await players.updateOne({uid},{$set:{
            discordid:discordId,
            discordname:discordName
        }})
        return result
    }finally{
        await client.close()
    }
}

export async function updatePlayerTeamId ({userId, teamId}: {userId: string, teamId: string}){
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const players=database.collection('users')
        const player = await players.updateOne({
            _id: new ObjectId(userId)
        },{
            $set:{ teamid: teamId}
        })
        return player
    }finally{
        await client.close()
    }
}

export async function favPlayer({playerId, userUid}: {playerId: string, userUid: string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const players=database.collection('users')
        const player = await players.updateOne({_id: new ObjectId(playerId)},{
            $addToSet: {followers: userUid}
        })
        return player
    }finally{
        await client.close()
    }
}


export async function unFavPlayer({playerId, userUid}: {playerId: string, userUid: string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const players=database.collection('users')
        const player = await players.updateOne({_id: new ObjectId(playerId)},{
            $pull: {followers: userUid}
        })
        return player
    }finally{
        await client.close()
    }
}


export async function upVotePlayer({playerId, userUid}: {playerId: string, userUid: string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const players=database.collection('users')
        const player = await players.updateOne({_id: new ObjectId(playerId)},{
            $addToSet: {upvote: userUid},
            $pull: {downvote: userUid}
        })
        return player
    }finally{
        await client.close()
    }
}

export async function unUpVotePlayer({playerId, userUid}: {playerId: string, userUid: string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const players=database.collection('users')
        const player = await players.updateOne({_id: new ObjectId(playerId)},{
            $pull: {upvote: userUid},
        })
        return player
    }finally{
        await client.close()
    }
}

export async function downVotePlayer({playerId, userUid}: {playerId: string, userUid: string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const players=database.collection('users')
        const player = await players.updateOne({_id: new ObjectId(playerId)},{
            $pull: {upvote: userUid},
            $addToSet: {downvote: userUid}
        })
        return player
    }finally{
        await client.close()
    }
}

export async function unDownVotePlayer({playerId, userUid}: {playerId: string, userUid: string}) {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const players=database.collection('users')
        const player = await players.updateOne({_id: new ObjectId(playerId)},{
            $pull: {downvote: userUid}
        })
        return player
    }finally{
        await client.close()
    }
}

export async function getFollowingPlayers({uid}: {uid:string}): Promise<playerType[]> {
    const client=new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database= client.db('psoleague')
        const players=database.collection('users')
        const player = await players.find({
            followers: {$in: [uid]}
        }).limit(30).toArray()
        const result:playerType[] = player.map((p) => {
            return {
                _id: p._id.toString(),
                username: p.username,
                teamid: p.teamid,
                country: p.country,
                mainpos: p.mainpos,
                secondpos: p.secondpos,
                avatar: p.avatar || null,
            }
        })
        return result
    }finally{
        await client.close()
    }
}