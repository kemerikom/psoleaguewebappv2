import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export async function getPlayerCard({url}:{url:string}) {
    const cardRef=ref(storage,`players/cards/${url}`)
    const result = await getDownloadURL(cardRef)
    return result
}