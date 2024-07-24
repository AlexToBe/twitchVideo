
'use client'
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { Button } from "../ui/button" 
import { Skeleton } from "../ui/skeleton"
import { ChatInfo } from "./chat-info"

interface ChatFormProps{
    onSubmit: ()=>void
    value: string,
    onChange: (value:string)=>void
  
    isHidden:boolean,
    isFollowing:boolean,
    isChatDelayd:boolean,
    isChatFollowerOnly:boolean,
}

export const ChatForm = ({
    onSubmit,
     value,
  onChange,
    isHidden,
    isFollowing,
    isChatDelayd,
    isChatFollowerOnly,
}:ChatFormProps) => {

  const [ isDelayBlocked, setIsDelayBlocked ] = useState(false)
  const isFollowerOnlyAndNotFollowing = isChatFollowerOnly &&!isFollowing
  const isDisabled = isHidden || isFollowerOnlyAndNotFollowing || isDelayBlocked
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    e.stopPropagation()
    if (!value||isDisabled) {
      return
    }
    if (isChatDelayd &&!isDelayBlocked) {
      setIsDelayBlocked(true)
      setTimeout(() => {
        setIsDelayBlocked(false)
        onSubmit()
        
      }, 3000);
    }else {
        onSubmit()
    }
  }
  if (isHidden) {
    return null
  } 
  
  
  return (
    <form
      onSubmit={handleSubmit}
      className=' flex flex-col items-center gap-y-4 p-3'
    >
      <div className=" w-full">
        <ChatInfo
          isDelayed={isChatDelayd}
          isFollowersOnly = {isChatFollowerOnly}
        />
        <Input
          onChange={(e)=>onChange(e.target.value)}
          value={value}
          disabled = {isDisabled}
          placeholder="Send a message"
          className={cn(
            "border-white/10",
            (isChatFollowerOnly||isChatDelayd) && 'rounded-t-none border-t-0'
         
          )}
          ></Input>
        </div>
      <div className=" ml-auto">
        <Button
          type="submit"
          variant='primary'
          size='sm'
          disabled={isDisabled}
        >
          Chat
        </Button>
        </div>
    </form>
  )
}

export const ChatFormSkeleton = () => {
  return (
    <div className=" flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
