'use client'

import { Dialog,DialogClose,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useState ,useTransition,useRef,ElementRef} from "react"
import { updateUser } from "@/actions/user"
import { toast } from "sonner"

interface BioModalProps {
    initialValue: string|null
}
export const BioModal = ({initialValue}:BioModalProps) => {
    const [value,setValue]=useState(initialValue)
    const [isPending,StartTransition] = useTransition()
    const closeRef = useRef<ElementRef<'button'>>(null)
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        StartTransition(() => {
            updateUser({ bio: value })
            .then(() => {
                toast.success('Bio updated')
                closeRef.current?.click()
            })
            .catch(() => {
                toast.error('Something went wrong')
            })  
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='link' size='sm' className=" ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit user bio
                    </DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={onSubmit}
                    className=" space-x-4"
                >
                    <Textarea
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="User bio"
                        value={value||''}
                        disabled={isPending}
                        className="resize-none"
                    />
                    <div className=" flex justify-between">
                        <DialogClose ref={ closeRef} asChild>
                            <Button type="button" variant='ghost'>
                                Cancel
                            </Button>
                        </DialogClose>
                          <Button disabled={isPending} type="submit" variant='primary'>
                                Save
                            </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}