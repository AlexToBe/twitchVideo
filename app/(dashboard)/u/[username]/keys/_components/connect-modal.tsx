'use client'

import { Button } from "@/components/ui/button"
import { DialogHeader } from "@/components/ui/dialog"
import { Dialog,DialogClose,DialogContent,DialogTitle,DialogTrigger } from '@/components/ui/dialog'
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select"
import { Alert,AlertDescription, AlertTitle} from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { IngressInput } from "livekit-server-sdk"
import { useState,useTransition,useRef, ElementRef } from "react"
import { createIngress } from "@/actions/ingress"
import { toast } from "sonner"



const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP|typeof WHIP

export const ConnectModal = () => {
  const closeRef = useRef<ElementRef<'button'>>(null)

  const [isPending,startTransition] = useTransition()

  const [ingressType,setIngressType] = useState<IngressType>(RTMP)
  
  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success('ingress created')
          closeRef.current?.click()
        })
      .catch(() => toast.error('failed to create ingress'))
    })
  }

  return (
    <Dialog>

      
      <DialogTrigger asChild>
        <Button variant='primary'>
            Generate connection
          </Button>
        </DialogTrigger>
        
        
      <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Generate connection
            </DialogTitle>
          </DialogHeader>
          
        <Select
          disabled = {isPending}
          value={ingressType}
          onValueChange={(value) => setIngressType(value as IngressType)}
        >
            <SelectTrigger className=" w-full">
              <SelectValue placeholder="Ingress Type"/>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={RTMP}>RTMP</SelectItem>
              <SelectItem value={WHIP}>WHIP</SelectItem>
            </SelectContent>
          </Select>
          
          <Alert>
           <AlertTriangle className=" h-4 w-4"/>
           <AlertTitle> Warning!</AlertTitle>
           <AlertDescription>
              This Action will reset all active streams using the current connecting
           </AlertDescription>
        </Alert>


        <div className="flex justify-end gap-4">
            <DialogClose ref={closeRef} asChild>
              <Button variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          <Button
            onClick = {onSubmit}
            variant='primary'
            disabled={isPending}
          >
              Generate
            </Button>
        </div>
        </DialogContent>
    </Dialog>
  )
}

