
'use client'
import { toast } from "sonner"
import { useTransition } from "react"
import { MinusCircle } from "lucide-react"
import { Hint } from "../hint"
import { onBlock } from "@/actions/block"
import { cn ,stringToColor} from "@/lib/utils"
import { Button } from "../ui/button"
import { group } from "console"



interface CommunityItemProps{
    hostName:string|null
    viewerName:string
    participantName:string
    participantIdentity:string
}
export const CommunityItem = ({
    hostName,
    viewerName,
    participantName,
    participantIdentity
}: CommunityItemProps) => {
    
    const [isPending,startTransition] = useTransition()
    const color = stringToColor(participantName||'')
    const isSelf = participantName === viewerName
    const isHost = viewerName === hostName
    const handleBlock = () => {
        if (!participantName|| isSelf||!isHost) return
        startTransition(()=> {
            onBlock(participantIdentity)
            .then(()=> {
                toast.success(`${participantName} blocked successfully`)
            })
            .catch(()=> {
                toast.error('Failed to block user')
            })
      })
    }

  return (
      <div className={cn(
          ' group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5',
          isPending && 'opacity-50 pointer-events-none'
      )}>
          <p style={{color:color}}>
              
            {participantName}
          </p>

          {isHost && !isSelf && (
              <Hint label = 'Block'>
                  <Button
                      variant='ghost'
                      disabled = {isPending}
                      onClick={handleBlock} className=" h-auto w-auto p-1 opacity-50 transition">
                      <MinusCircle className=" h-4 w-4"/>
                </Button>
              </Hint>
          )}
    </div>
  )
}

