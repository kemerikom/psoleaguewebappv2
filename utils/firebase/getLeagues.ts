import { db } from "./config";
import {collection,query,where,getDocs} from 'firebase/firestore'


export async function getLeagueNames() {
    const q= query(collection(db,'leagues'))
    const qss= await getDocs(q)
    const data= qss.docs.map((doc)=>{
        return{
            id:doc.id,
            name:doc.data().name,
            logo:doc.data().logo,
            color1:doc.data().color1,
            color2:doc.data().color2,
            fontcolor:doc.data().fontcolor,
            shortname:doc.data().shortname,
            official:doc.data().official
        }
    })
    return data
}