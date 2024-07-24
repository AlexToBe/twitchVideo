'use server'

import { getSelf } from "@/lib/auth-service"
import { blockUser,unBlockUser } from "@/lib/block-service"
import { RoomServiceClient } from "livekit-server-sdk"
import { revalidatePath } from "next/cache"
const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
)



export const onBlock = async (id: string) => {
    let blockedUser 
    const self = await getSelf()
        try {
            blockedUser = await blockUser(id)
            } catch (error) {
            // throw new Error('Internal error')
        }
        try {
            await roomService.removeParticipant(self.id,id)
        } catch (error) {
            
        }
    
        revalidatePath(`/u/${self.username}/community`)
       
        return blockedUser
   
}

export const onUnblock = async (id: string) => {
    try {
        const self = await getSelf()
        const unblockedUser = await unBlockUser(id)
       
        revalidatePath(`/u/${self.username}/community`)
        return unblockedUser
    } catch (error) {
        throw new Error('Internal error')
    }
}