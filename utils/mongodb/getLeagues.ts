import {MongoClient, ObjectId} from 'mongodb'



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
            {'admins.id':_id},
            {'mods.id':_id}
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
        await client.close()
    }
}

export async function addLeagueAdmin({leagueId,userId,userName}:{leagueId:string,userId:string,userName:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const leagues=database.collection('leagues')
        const league= await leagues.updateOne({_id:new ObjectId(leagueId)},{
            $addToSet:{
                admins:{
                    id:userId,
                    username:userName
                }
            }
        })
        return league
    }finally{
        await client.close()
    }
    
}

export async function removeLeagueAdmin({leagueId,adminUserName,adminId}:{leagueId:string,adminUserName:string,adminId:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const leagues=database.collection('leagues')
        const league= await leagues.updateOne({_id:new ObjectId(leagueId)},{
            $pull:{
                admins:{
                    id:adminId,
                    username:adminUserName
                }
            }
        })
        return league
    }finally{
        await client.close()
    }
}


export async function addLeagueModerator({leagueId,userId,userName}:{leagueId:string,userId:string,userName:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const leagues=database.collection('leagues')
        const league= await leagues.updateOne({_id:new ObjectId(leagueId)},{
            $addToSet:{
                mods:{
                    id:userId,
                    username:userName
                }
            }
        })
        return league
    }finally{
        await client.close()
    }
}


export async function removeLeagueModerator({leagueId,moderatorUserName,moderatorId}:{leagueId:string,moderatorUserName:string,moderatorId:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const leagues=database.collection('leagues')
        const league= await leagues.updateOne({_id:new ObjectId(leagueId)},{
            $pull:{
                mods:{
                    id:moderatorId,
                    username:moderatorUserName
                }
            }
        })
        return league
    }finally{
        await client.close()
    }
}


export async function addLeagueRefree({leagueId,refreeUserName,refreeId}:{leagueId:string,refreeUserName:string,refreeId:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const leagues=database.collection('leagues')
        const league= await leagues.updateOne({_id:new ObjectId(leagueId)},{
            $addToSet:{
                refrees:{
                    id:refreeId,
                    username:refreeUserName
                }
            }
        })
        return league
    }finally{
        await client.close()
    }
}


export async function removeLeagueRefree({leagueId,refreeUserName,refreeId}:{leagueId:string,refreeUserName:string,refreeId:string}) {
    const client= new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database=client.db('psoleague')
        const leagues=database.collection('leagues')
        const league= await leagues.updateOne({_id:new ObjectId(leagueId)},{
            $pull:{
                refrees:{
                    id:refreeId,
                    username:refreeUserName
                }
            }
        })
        return league
    }finally{
        await client.close()
    }
}


export async function getLeagueIds() {
    const client= new MongoClient(process.env.mongoUri)
    try {
        await client.connect()
        const database=client.db('psoleague')
        const leagues=database.collection('leagues')
        const league=leagues.find()
        const data = await league.toArray()
        const result= data.map((d)=>{
            return{
                _id:d._id.toString()
            }
        })
        return result
    }finally{
        await client.close()
    }
}