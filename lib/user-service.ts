import { db } from "./db";

export const getUserByUserName = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username:username
        },
        select: {
            id: true,
            username: true,
            bio: true,
            externalUserId:true,
            imageUrl: true,
            stream: {
                select: {
                    id: true,
                    isLive: true,
                    isChatDelayd: true,
                    isChatEnabled: true,
                    isChatFollowersOnly: true,
                    thumbnaiUrl: true,
                    name:true
                }
            },
            _count: {
                select: {
                    followedBy: true,
                }
            }
        }
    });
    return user
}

export const getUserByUserId = async (id: string) => {
    const user = await db.user.findUnique({
        where: {
            id
        },
        include: {
            stream: true
        }
    });
    return user
}