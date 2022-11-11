import {MongoClient} from 'mongodb'

const client= new MongoClient(process.env.mongoUri)

export async function getLeagues() {
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
    try {
        await client.connect()
        const database=client.db('psoleague')
        const leagues=database.collection('leagues')
        const league=leagues.find()
        const data = await league.toArray()
        const result= data.map((d)=>{
            return{
                _id:d._id
            }
        })
        return result
    }finally{
        await client.close()
    }
}