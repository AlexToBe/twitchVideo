'use client'

import { useAuth } from "@clerk/nextjs"
import { Button } from "../ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { onFollow,onUnFollow } from "@/actions/follow"
import { toast } from "sonner"
interface ActionsProps{
  isFollowing:boolean
  hostIdentity:string
  isHost :boolean
}
export const Actions = ({
  isFollowing,
  hostIdentity,
  isHost,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()
  const { userId } = useAuth()
  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) => toast.success(`follow ${data.following.username}success`))
      .catch(()=>toast.error('something went wrong'))
    })
  }

  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(hostIdentity)
      .then((data) => toast.success('unfollow success'))
      .catch(()=>toast.error('something went wrong')) 
    })
  }



  const toggleFollow = () => {
    if (!userId) {
      return router.push('/sign-in')
    }
    if (isHost) return
    if (isFollowing) {
      handleUnFollow()
    } else {
      handleFollow()
    }
  }
  
  return (
    <Button
      variant='primary'
      size='sm'
      className=" w-full lg:w-auto"
      disabled={isPending|| isHost}
      onClick={toggleFollow}
    >
      <Heart className={cn('h-4 w-4 mr-2', isFollowing ? 'fill-white' : 'fill-none')} />
      {isFollowing?'Unfollow':'Follow'}
    </Button>
  )
}

