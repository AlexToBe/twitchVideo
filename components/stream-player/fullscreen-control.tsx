'use client'

import { Maximize, Minimize } from "lucide-react"
import { Hint } from "@/components/hint"

interface FullscreenControlProps{
    isFullScreen:boolean,
    onToggle: () => void
}

export const FullscreenControl = ({
    isFullScreen,
    onToggle
}: FullscreenControlProps) => {

    const Icon = isFullScreen ? Minimize : Maximize
    const label = isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'
    
    return (
        <div className=" flex items-center justify-center gap-4">
            <Hint label={label} asChild>
                <button
                    onClick={onToggle}
                    className=" text-white p-1.5 hover:bg-white/10 rounded-lg"
                >
                    <Icon className=" h-6 w-6 "/>
                </button>
            </Hint>
        </div>
    )
}