

import { useMemo } from "react"
import { Info } from "lucide-react"
import { Hint } from "../hint"


interface ChatInfoProps{
    isDelayed: boolean,
    isFollowersOnly:boolean   
}


export const ChatInfo = ({ 
    isDelayed,
    isFollowersOnly,
}:ChatInfoProps) => {
  const hint = useMemo(() => {
    let infos =''

    if (isDelayed && !isFollowersOnly) {
      infos ='Chat is delayed.'
    }

    if (isFollowersOnly && !isDelayed) {
      infos ='Only followers can chat'

    }
     if (isDelayed && isFollowersOnly) {
      infos ='Only followers can chat.Messages are delayed by 3 seconds'

    }

    return infos
  }, [isDelayed, isFollowersOnly])
  
  const label = useMemo(() => {
    let infos =''

    if (isDelayed && !isFollowersOnly) {
      infos ='Slow mode'
    }

    if (isFollowersOnly && !isDelayed) {
      infos ='Followers only'

    }
     if (isDelayed && isFollowersOnly) {
      infos ='Followers only and slow mode'

    }
   
    return infos
  }, [isDelayed, isFollowersOnly])
  
   if (!isDelayed && !isFollowersOnly) {
      return null
    }
  
  return (
    <div className=" p-2 text-muted-foreground bg-white/5 border border-white/10 w-full
     rounded-t-md flex items-center gap-x-2"
    >
      <Hint label={hint}>
        <Info className=" h-5 w-5" />
      </Hint>  
      <p className=" text-xs font-semibold">
        {label}
      </p>
    </div>
  )
}

