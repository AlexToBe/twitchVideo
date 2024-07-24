'use client'

import qs from 'query-string'
import { use, useState } from 'react'
import { SearchIcon,X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'

export const Search = () => {
    const router = useRouter()
    const [value, setValue] = useState('')
  

    const OnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!value) {
            return
        }
        const url = qs.stringifyUrl({
            url:'/search',
            query: {term:value}
        }, {
            skipEmptyString:true
        })
        router.push(url)
    }
    
    const clearInput = () => {
        setValue('')
    }
    
    return (
        <form
            onSubmit={OnSubmit}
            className=" relative w-full lg:w-[400px] flex items-center"
        >
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder='search'
                className=' rounded-r-none focus-visible:ring-0  focus-visible:ring-transparent focus-visible:ring-offset-0'
            />
            {value && (<X
                onClick={clearInput}
                className=' absolute right-14 top-2.5 h-5 w-5  text-muted-foreground hover:opacity-75 transition cursor-pointer'
            />)}
            <Button
                type = 'submit'
                size='sm'
                variant='secondary'
                className=' rounded-l-none'
                
            >
                <SearchIcon className=' h-5 w-5 text-muted-foreground'/>
            </Button>
        </form>
    )
}