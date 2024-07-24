'use client'

import { Button } from "@/components/ui/button"
import { onFollow, onUnFollow } from "@/actions/follow"
import { onBlock,onUnblock } from "@/actions/block"
import { useTransition } from "react"
import { toast } from "sonner"



export const Actions = ({isFollowing,userId,blocked}:{isFollowing:boolean,userId:string,blocked:boolean}) => {
    const[isPending,startTransition] = useTransition()

    const onClickFollow = () => {
        startTransition(() => {
            onFollow(userId).then((data) => {
                toast.success(`you have followed ${data.following.username}`)
            }).catch(() => {
                toast.error('action follow went wrong')
            })
        })
       
    }

        const onClickUnollow = () => {
        startTransition(() => {
            onUnFollow(userId).then((data) => {
                toast.success(`you have unfollowed ${data.following.username}`)
            }).catch(() => {
                toast.error('action unfollow went wrong')
            })
        })
       
    }
    

    const onClickBlock = () => {
        startTransition(() => {
            onBlock(userId).then((data) => {
                toast.success(`you have blocked ${data?.blocked.username}`)
            }).catch(() => {
                toast.error('action block went wrong')
            })
        })
       
    }

        const onClickUnBlock = () => {
        startTransition(() => {
            onUnblock(userId).then((data) => {
                toast.success(`you have unblock ${data.blocked.username}`)
            }).catch(() => {
                toast.error('action unblock went wrong')
            })
        })
       
    }
    
    return (
        <div className="flex items-center justify-center gap-4">
            <Button disabled ={isPending} onClick={isFollowing ? onClickUnollow : onClickFollow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {isFollowing ? 'Unfollowing' : 'Follow'}
            </Button>

            <Button disabled ={isPending} onClick={blocked ? onClickUnBlock : onClickBlock} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {blocked ? 'UnBlock' : 'Block'}
            </Button>
            
        </div>
    )
}