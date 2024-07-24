'use client'

import { useViewerToken } from '@/hooks/use-viewer-token'
import { Stream, User } from '@prisma/client'
import {   LiveKitRoom } from '@livekit/components-react'
import { Video, VideoSkeleton } from './video'
import { cn } from '@/lib/utils'
import { useChatSidebar } from '@/store/use-chat-sidebar'
import { Chat } from './chat'
import { ChatToggle } from './chat-toggle'
import { ChatFormSkeleton } from './chat-form'
import { Header } from './header'
import { InfoCard } from './info-card'
import { AboutCard } from './about-card'

type CustomStream = {
    id: string,
    isLive: boolean,
    isChatDelayd: boolean,
    isChatEnabled: boolean,
    isChatFollowersOnly: boolean,
    thumbnaiUrl: string|null,
    name:string 
}
type CustomUser = {
    id: string,
    bio: string|null,
    username:string|null 
    imageUrl: string,
    stream: CustomStream | null,
    _count:{followedBy:number}
}

interface StreamPlayerProps{
    user: CustomUser,
    stream: CustomStream,
    isFollowing: boolean,
}
export const StreamPlayer = ({user,stream,isFollowing}:StreamPlayerProps) => {
    const {collapsed} = useChatSidebar((state)=>state)

    
    
    const {name, identity,token} = useViewerToken(user.id)
        if (!name||!token||!identity) {
            return <StreamPlayerSkeleton/>
        }
    return (
        <div>
            {collapsed && (
                <div className=' hidden lg:block fixed top-[100px] right-2 z-50'>
                    <ChatToggle/>
                </div>
            )}
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_RUL}
                className={cn(' grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full',
                    collapsed &&'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'
                )}
            >
                <div className=' space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto  hidden-scrollbar pb-10'>
                    <Video
                        hostName={user.username}
                        hostIdentity={user.id}
                    />
                    <Header
                       hostName={user.username}
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        imageUrl={user.imageUrl}
                        isFollowing={isFollowing}
                        name = {stream.name}
                    />
                    <InfoCard
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        name={stream.name}
                        thumbnailUrl = {stream.thumbnaiUrl}
                    />
                    <AboutCard
                        hostName={user.username}
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        bio={user.bio}
                        followedByCount = {user._count.followedBy}
                    />
                </div>
                <div className={cn(
                    'col-span-1',
                    collapsed&&'hidden'
                )}>
                    <Chat
                        viewerName={name}
                        hostName={user.username}
                        hostIdentity={user.id}
                        isFollowing={isFollowing}
                        isChatEnabled={stream.isChatEnabled}
                        isChatDelayd = {stream.isChatDelayd}
                        isChatFollowerOnly = {stream.isChatFollowersOnly}
                    />
                </div>
            </LiveKitRoom>
        </div>
    )
}

export const StreamPlayerSkeleton = () => {
    return (
        <div className='grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full'>

            <div className='space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto  hidden-scrollbar pb-10'>
                <VideoSkeleton/>
            </div>
            <div className='col-span-1 bg-background'>
                <ChatFormSkeleton/>
            </div>

        </div>
    )
}