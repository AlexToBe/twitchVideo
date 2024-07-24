
import { StreamPlayer } from "@/components/stream-player"
import { getUserByUserName } from "@/lib/user-service"
import { currentUser } from "@clerk/nextjs/server"

interface CreatorPageProps{
    params:{username:string}
}

const CreatorPage = async({params}:CreatorPageProps) => {
  const externalUser = await currentUser()
  const user = await getUserByUserName(params.username)
  if (!user||user.externalUserId!== externalUser?.id ||!user.stream) {
    return <div>user not found</div>
  }
  return (
    <div>
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing
      />
    </div>
  )
}

export default CreatorPage