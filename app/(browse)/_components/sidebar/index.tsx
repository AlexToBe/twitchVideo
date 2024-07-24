import { getRecommended } from "@/lib/recommended-service"
import { Recommended } from "./recommended"

import { Toggle } from "./toggle"
import { Wrapper } from "./wrapper"
import { getFollowerdUsers } from "@/lib/follow-services"
import { Following, FollowingSkeleton } from "./following"

export const SideBar = async() => {
    const recommended = await getRecommended()
    const following = await getFollowerdUsers()
    return (
        <Wrapper >
            <Toggle></Toggle>
            <div className=" space-y-4 pt-4 lg:pt-0">
                <Following data={following} />
                <Recommended data={recommended} />
            </div>
        </Wrapper>
    )
}

export const SideBarSkeleton = () => {
    return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
            <FollowingSkeleton/>
        </aside>
    )
}