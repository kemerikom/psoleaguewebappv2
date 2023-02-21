import { MongoClient } from "mongodb";


export async function lookingForTeamList({page = 1}: {page?: number}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database = client.db('psoleague')
        const lfts = database.collection('lookingforteam')
        const lft = await lfts.find().sort({datetime: -1}).limit(page * 20).toArray()
        return lft
    }finally{
        await client.close()
    }
}


export async function lookingForPlayerList({page = 1}: {page?: number}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database = client.db('psoleague')
        const lfps = database.collection('lookingforplayer')
        const lfp = await lfps.find().sort({datetime: -1}).limit(page * 20).toArray()
        return lfp
    }finally{
        await client.close()
    }
}


export async function addLookingForTeam({userName, userId, mainPos, secPos, avatar, country, datetime}: {userName: string, userId: string, mainPos: string, secPos: string, avatar: string, country: string, datetime: number}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database = client.db('psoleague')
        const lfts = database.collection('lookingforteam')
        const lft = await lfts.updateOne({
            userid: userId
        }, {$set:{
            username: userName,
            userid: userId,
            mainpos: mainPos || null,
            secpos: secPos || null,
            avatar: avatar || null,
            country: country || null,
            datetime}
        }, {upsert: true})
        return lft
    }finally{
        await client.close()
    }
}


export async function addLookingForPlayer({teamId, positions, datetime, teamName, teamLogo}: {teamId: string, positions: string[], datetime: number, teamName: string, teamLogo?: string | null}): Promise<boolean> {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database = client.db('psoleague')
        const collection = database.collection('lookingforplayer')
        const lfp = await collection.insertOne({
            teamid: teamId,
            teamname: teamName,
            teamlogo: teamLogo || null,
            positions,
            datetime
        })
        if (lfp.insertedId) {
            return true
        }else {
            return false
        }
    }finally {
        await client.close()
    }
}

export async function checkLookingForTeamTime({userId, dateTime}: {userId: string, dateTime: number}) {
    const client = new MongoClient(process.env.mongoUri)
    try{
        await client.connect()
        const database = client.db('psoleague')
        const lfts = database.collection('lookingforteam')
        const newDate = new Date(dateTime)
        newDate.setHours(newDate.getHours() - 12)
        const lft = await lfts.find({
            userid: userId
        }).sort({datetime: -1}).limit(1).toArray()
        if (lft.length > 0){
            if (lft[0].datetime > newDate) {
                return false
            }else{
                return true
            }
        }else{
            return true
        }

    }finally{
        await client.close()
    }
}


export async function checkLookingForPlayer({teamId, dateTime}: {teamId: string, dateTime: number}):Promise<boolean> {
    const client = new MongoClient(process.env.mongoUri)
    try {
        await client.connect()
        const database = client.db('psoleague')
        const lfps = database.collection('lookingforplayer')
        const newDate = new Date(dateTime)
        newDate.setHours(newDate.getHours() - 12)
        const lfp = await lfps.find({
            teamid: teamId
        }).sort({datetime: -1}).limit(1).toArray()
        if (lfp.length > 0) {
            if (lfp[0].datetime > newDate) {
                return false
            }else {
                return true
            }
        }else {
            return true
        }
    }finally {
        await client.close()
    }
}