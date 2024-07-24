import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider

} from '@/components/ui/tooltip'

interface HintProps{
    label: string,
    children: React.ReactNode,
    asChild?: boolean,
    side?: 'top' | 'right' | 'bottom' | 'left',
    align?:'start'|'center'|'end'
}


export const Hint = ({
    children,
    asChild,
    side = 'top',
    align = 'center',
    label
}:HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild = {asChild}>
                    {children}
                </TooltipTrigger>
                    <TooltipContent className=' text-black bg-white' side={side} align={align}>
                        <p>
                            {label}
                        </p>
                    </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}