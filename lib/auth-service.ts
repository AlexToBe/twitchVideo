import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
export const getSelf = async () => {
    let self = null
    try {
        self= await currentUser()
        
    } catch (error) {
        
    }
    if (!self || !self.username) {
        throw new Error("Unauthorized")
    }
    const user = await db.user.findUnique({
        where: {
            externalUserId: self.id
        }
    })

    if (!user) {
        throw new Error("User not found")
    }
    return user
}

export const getSelfByUsername = async (username: string) => {
    const self = await getSelf()
    if (!self||!self.username) {
        throw new Error("Unauthorized")
    }
    const user = await db.user.findUnique({
        where: {
            username
        }
    })

    if (!user) {
        throw new Error("User not found")
    }
    if (self.username!==user.username) {
        throw new Error("Unauthorized")
        
    }

    return user
}


