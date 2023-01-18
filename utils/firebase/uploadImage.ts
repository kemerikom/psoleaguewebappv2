import { storage } from "./config";
import { ref, uploadString } from 'firebase/storage'

export async function uploadTeamLogo({image, teamId}: {image:any, teamId:string}) {
    const logoRef = ref(storage, `teamlogos/${teamId}.png`)
    try {
        uploadString(logoRef, image, 'data_url')
        return true
    } catch (error) {
        console.log(error)
        return false        
    }

} 