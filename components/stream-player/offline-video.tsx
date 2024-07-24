import { WifiOff } from 'lucide-react'
import React from 'react'


interface OfflineVideoProps{
    username:string|null
}
export const OfflineVideo = ({
    username
}:OfflineVideoProps) => {
  return (
    <div className=' h-full flex flex-col space-y-4 justify-center items-center'>
      <WifiOff className=' h-10 w-10 text-muted-foreground'/>
        <p className=' ext-muted-foreground'>
              {username} is offline
        </p>
    </div>
  )
}

