'use server'

import { v4 } from "uuid"
import { AccessToken } from "livekit-server-sdk"
import { getSelf } from "@/lib/auth-service"
import { getUserByUserId } from "@/lib/user-service"
import { isBlockedByUser } from "@/lib/block-service"

export const createViewerToken = async (hostIdentity: string) => {
    let self 
    try {
        self = await getSelf()
    } catch (error) {
        const id = v4()
        const username = `guest#${Math.floor(Math.random()*1000)}`

        self = {id,username}
    }
    const host = await getUserByUserId(hostIdentity)
    if (!host) {
        throw new Error('user not found')
    } 

    const isBlocked = await isBlockedByUser(host.id)
    if (isBlocked) {
        throw new Error('user is blocked')
    }

    const isHost = self.id ===host.id
    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!,
        {
            identity: isHost?`host-${self.id}`: self.id,
            name: self.username
        }
    )
    token.addGrant({
        roomJoin: true,
        room: host.id,
        canPublish: true,
        canPublishData:true
    })

    return await Promise.resolve(token.toJwt())
}