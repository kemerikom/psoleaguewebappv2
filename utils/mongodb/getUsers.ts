import { MongoClient, ObjectId } from "mongodb";


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

export async function createUserData({id,username,country,mainpos,secpos}:{id:string,username:string,country:string,mainpos:string,secpos:string}) {
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
            secpos,
            teamid:'free'
        })
        return user
    }finally{
        await client.close()
    }
}