import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { createViewerToken } from '@/actions/token'

export const useViewerToken = (hostIdentity:string)=> {
    const [token, setToken] = useState<string | null>(null)
    const [name, setName] = useState('')
    const [identity, setIdentity] = useState('')
    

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViewerToken(hostIdentity)

                setToken(viewerToken)
                const decodedToken= jwtDecode(viewerToken) as JwtPayload &{name?:string}
                const identity = decodedToken.jti
                const name = decodedToken.name || 'anonymous'   
                if (identity) {
                    
                    setIdentity(identity)
                }
                setName(name)
            } catch (error) {
                toast.error('something went wrong')
            }
        }
        createToken()
    }, [hostIdentity])

    return { token,name,identity }
}