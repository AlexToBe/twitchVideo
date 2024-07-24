import { isFollowingUser } from "@/lib/follow-services"
import { getUserByUserName } from "@/lib/user-service"
import { notFound } from "next/navigation"
import { Actions } from "./_components/actions"
import { isBlockedByUser } from "@/lib/block-service"
import { StreamPlayer } from "@/components/stream-player"

interface UserPageProps{
    params: {
        username:string
    }
}



const UserPage = async ({params}:UserPageProps) => {
    const user = await getUserByUserName(params.username)
    if (!user||!user.stream) {
        notFound()
    }

    const isFollowing = await isFollowingUser(user.id)
    const isBlocking = await isBlockedByUser(user.id)
    if (isBlocking) {
      notFound()
    }
    
  return (
    <StreamPlayer
      user={user}
      stream={user.stream}
      isFollowing = {isFollowing}
    />
   
  )
}

export default UserPage
