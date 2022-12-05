import {auth} from './config'

export async function getCurrentUser() {
    const user = auth.currentUser
    return user
}