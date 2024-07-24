import { db } from "./db";
import { getSelf } from "./auth-service";


export const isBlockedByUser = async (id: string) => {
    try {
        const self = await getSelf()
        const otherUser = await db.user.findUnique({
            where: { id }
        })
        if (!otherUser) {
            throw new Error('User not found')
        }
        if (otherUser.id===self.id) {
            return false
        }

        const existingBlock = await db.block.findUnique({
            where: {
                blockerId_blockedId:{
                    blockedId:self.id , 
                    blockerId: otherUser.id
                }
            }
        })
        return !!existingBlock
    } catch (error) {
        return false
    }
}



export const blockUser = async (id: string) => {
    try {
        const self = await getSelf()
        const otherUser = await db.user.findUnique({
            where: { id }
        })
        if (!otherUser) {
            throw new Error('User not found')
        }
        if (otherUser.id===self.id) {
            throw new Error('can not block your self')

        }

        const existingBlock = await db.block.findUnique({
            where: {
                blockerId_blockedId:{
                    blockerId: self.id,  
                    blockedId: otherUser.id
                }
            }
        })
        if (existingBlock) {
            throw new Error('already blocked')
        }

        const block = await db.block.create({
            data: {
                blockerId: self.id,  
                blockedId: otherUser.id
            },
            include: {
                blocked: true,
            }
        })


        return block
    } catch (error) {
        throw new Error('something went wrong when blocking')
    }
}


export const unBlockUser = async (id: string) => {
    try {
        const self = await getSelf()
        const otherUser = await db.user.findUnique({
            where: { id }
        })
        if (!otherUser) {
            throw new Error('User not found')
        }
        if (id===self.id) {
            throw new Error('can not block yourself')

        }

        const existingBlock = await db.block.findUnique({
            where: {
                blockerId_blockedId:{
                    blockerId: self.id,  
                    blockedId: otherUser.id
                }
            }
        })
        if (!existingBlock) {
            throw new Error('user not blocked')
        }

        const unblock = await db.block.delete({
            where: {
                id:existingBlock.id
            },
            include: {
                blocked: true,
            }
        })


        return unblock
    } catch (error) {
        throw new Error('something went wrong when unblocking')
    }
}


export const getBlockedUsers = async () => {
    try {
        const self = await getSelf()
        const getBlockedUsers = await db.block.findMany({
            where: {
                blockerId: self.id
            },
            include: {
                blocked:true,
            }
        })
        return getBlockedUsers
    } catch (error) {
        return []
    }
}