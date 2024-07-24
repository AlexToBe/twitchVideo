
'use client'
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useCreatorSidebar } from "@/store/use-creator-sidebar"
import { useIsClient } from "usehooks-ts"


interface WrapperProps{
    children:React.ReactNode
}
export const Wrapper = ({ children }: WrapperProps) => {
    const isClient = useIsClient()
    const {collapsed} = useCreatorSidebar((state)=>state)

    if (!isClient) {
        return (
             <aside className=" fixed left-0 flex flex-col w-[70px]  lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
           
            <Skeleton/>
        </aside>
        )
    }
    
    
    return (
        <aside className={cn(" fixed left-0 flex flex-col  w-60 h-full bg-background border-r border-[#2d2e35] z-50",
            collapsed && 'w-[70px]'
        )}>
            {children}
        </aside>

    )
}