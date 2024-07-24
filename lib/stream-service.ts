import { db } from "./db";
import { getSelf } from "./auth-service";


export const getStreamByUserId = async (userId: string) => {
    const stream = await db.stream.findUnique({
        where: { userId }
    })
    return stream
}

