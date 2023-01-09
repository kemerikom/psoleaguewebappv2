import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./config";
var XMLHttpRequest = require('xhr2');

export async function getPlayerCard({url}:{url:string}) {
    /* const cardRef=ref(storage,`players/cards/${url}`)
    const result = await getDownloadURL(cardRef)
    return result */
    let urlCard=''
    getDownloadURL(ref(storage,`players/cards/${url}`))
    .then((url)=>{
        const xhr = new XMLHttpRequest()
        xhr.responseType='blob'
        xhr.onload=(event:any)=>{
            const blob=xhr.response
        }
        xhr.open('GET',url)
        xhr.send()
        console.log('url',url)
        urlCard=url
    })
    console.log('url',urlCard)
    return urlCard

    /* const cardRef=ref(storage,`players/cards/${url}`)
    const result = await getMetadata(cardRef)
    return result */
}