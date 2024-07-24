

import { useParticipants } from '@livekit/components-react'
import { LocalParticipant, Participant, RemoteParticipant } from 'livekit-client'
import React, { useMemo, useState } from 'react'
import { useDebounceValue} from 'usehooks-ts'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { CommunityItem } from './community-item'
interface ChatCommunityProps{
    viewerName: string,
    hostName: string|null,
    isHidden: boolean,
    
}

export const ChatCommunity = ({
    viewerName, hostName, isHidden,
}:ChatCommunityProps) => {
    const partcipants = useParticipants()
    const [value ,setValue] = useState('')
    const [debouncedValue] = useDebounceValue<string>(value,500)
    const onChange = (newValue:string) => {
        setValue(newValue)
    }
    const filteredParticipants = useMemo(() => {
        const deduped = partcipants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`
            if (!acc.some((p)=>p.identity ===hostAsViewer)) {
                acc.push(participant)
            }
            return acc
        },[] as (RemoteParticipant|LocalParticipant)[])

        return deduped.filter((participant) => {
            return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase())
        })
    },[partcipants,debouncedValue])
    if (isHidden) {
        return (
            <div className=' flex flex-1 items-center justify-center'>
                <p className=' text-sm text-muted-foreground '>
                    Community is disabled
                </p>
            </div>
        )
    }

  return (
    <div className=' p-4'>
          <Input
              onChange={(e) => onChange(e.target.value)}
              placeholder='search community'
              className = 'border-white/10'
          />
          <ScrollArea className=' gap-y-2 mt-4'>
              <p className=' text-center text-sm text-muted-foreground hidden last:block p-2'>
                  No results
              </p>
              {filteredParticipants.map((participant) => (
                  <CommunityItem
                      key={participant.identity}
                      hostName={hostName}
                      viewerName={viewerName}
                      participantName={participant.name||'unknown'}
                      participantIdentity={participant.identity}
                  />
              ))}
          </ScrollArea>
          
          
    </div>
  )
}

