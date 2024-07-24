

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { useState,useRef,ElementRef } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label' 
import { useTransition } from 'react'
import { Button } from '../ui/button'
import { updateStream } from '@/actions/stream'
import { toast } from 'sonner'
import { UploadDropzone } from '@/lib/uploadthing'
import { useRouter } from 'next/navigation'
import { Divide, Trash } from 'lucide-react'
import { Hint } from '../hint'
import Image from 'next/image'
import { set } from 'date-fns'
interface InfoModalProps{
    initialThumbnailUrl:string|null
    initialName:string

}


export const InfoModal = ({
    initialThumbnailUrl,
    initialName
}: InfoModalProps) => {
    const closeRef = useRef<ElementRef<'button'>>(null)
    const router = useRouter()
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl)
    const [name, setName] = useState(initialName)
    const [isPending, startTransition] = useTransition()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onRemoveThumbnailUrl = () => {
        startTransition(() => {
            updateStream({ thumbnaiUrl: null })
            .then(() => {
                toast.success('Thumbnail removed')
                setThumbnailUrl(null)
                closeRef?.current?.click()
                // router.refresh()
            })
            .catch(() => {
                toast.error('Something went wrong')
            })
        })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() 
        startTransition(() => {
            updateStream({ name: name })
            .then(() => {
                toast.success('Stream updated')
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
              <Button variant='link' size='sm' className=' ml-auto'>
                  Edit
              </Button>
        </DialogTrigger>
          <DialogContent>
              <DialogHeader>
                    <DialogTitle>
                      Edit stream
                  </DialogTitle>
              </DialogHeader>
              <form
                  className=' space-y-14'
                  onSubmit={onSubmit}>
                  <div className=' space-y-2'>
                        <Label htmlFor="thumbnailUrl">
                          name
                      </Label>
                      <Input
                        placeholder='Stream name'
                          onChange={onChange}
                          value={name}
                          disabled ={isPending}
                      />
                  </div>
                  <div className=' space-y-2'>
                      <Label>
                          Thumbnail
                      </Label>
                      {thumbnailUrl ? (<div className=' relative aspect-video rounded-xl
                       overflow-hidden border border-white/10'>
                          <div className=' absolute top-2 right-2 z-[10]'>
                              <Hint label='Remove thumbnail' asChild
                              side='left'>
                                  <Button
                                      type='button'
                                      disabled={isPending}
                                      className=' h-auto w-auto p-1.5'
                                      onClick={onRemoveThumbnailUrl}
                                  >
                                      <Trash className=' h-4 w-4'/>
                                  </Button>
                              </Hint>
                          </div>
                          <Image
                              fill
                              alt=''
                              src={thumbnailUrl}
                              className=' object-cover'
                          />
                              
                      </div>
                          
                      ):(
                        <div className=' rounded-xl border outline-dashed outline-muted'>
                            <UploadDropzone
                                endpoint='thumbnailUploader'
                                appearance={{
                                    label: {
                                        color:'#ffffff'
                                    },
                                    allowedContent: {
                                        color:'#ffffff'
                                    }
                                }}
                                onClientUploadComplete={(res) => {
                                    setThumbnailUrl(res[0].url)
                                    router.refresh()
                                    closeRef?.current?.click()

                                }}
                            >
                                
                            </UploadDropzone>
                        </div>
                    )}
                  </div>
                  <div className=' flex justify-between'>
                      <DialogClose ref={closeRef} asChild>
                          
                        <Button
                            type='button'
                            variant='ghost'
                            >
                            Cancel
                        </Button>
                        </DialogClose>
                       <Button
                          type='submit'
                          variant='primary'
                          disabled={isPending}
                      >
                          Save
                      </Button>
                  </div>
              </form>
        </DialogContent>
    </Dialog>
  )
}

