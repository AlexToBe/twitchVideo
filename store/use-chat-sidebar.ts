import { create } from 'zustand'

export enum ChatVariant{
    CHAT = 'CHAT',
    COMMUNITY = 'COMMUNITY'
}

interface ChatSidebarStore{
    collapsed: boolean,
    variant:ChatVariant,
    onExpand:()=>void,
    onCollapse: () => void,
    onChatVariant:(variant:ChatVariant)=>void
    
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
    collapsed:false,
    variant:ChatVariant.CHAT,
    onExpand:()=>set(()=>({collapsed:false})),
    onCollapse:()=>set(()=>({collapsed:true})),
    onChatVariant:(variant:ChatVariant)=>set(()=>({variant}))

}))