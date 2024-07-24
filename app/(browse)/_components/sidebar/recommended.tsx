'use client'
import { useSidebar } from "@/store/use-sidebar"
import { Stream, User } from "@prisma/client"
import { UserItem } from "./user-item"
interface RecommendedProps{
    data: (User & {
        stream: {isLive:boolean} |null
    })[]
}

export const Recommended = (
    { data }: RecommendedProps) => {
    const {collapsed}= useSidebar((state)=>state)
    const showLabel = !collapsed && data.length >0
    return (
        <div>
            {showLabel&&(<div className=" pl-6 mb-4">
                <p className=" text-sm text-muted-foreground">
                    recommended
                </p>
            </div>
            )}
            <ul className=" space-y-2 px-2">
                {data.map((user)=>(
                    <UserItem
                        username={user.username}
                        imageUrl={user.imageUrl}
                        isLive = {user.stream?.isLive}
                        key={user.id} />
                     
                ))}
            </ul>
        </div>
    )
}