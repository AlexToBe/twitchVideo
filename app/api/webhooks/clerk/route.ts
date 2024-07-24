import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { resetIngresses } from "@/actions/ingress";

export async function POST(req:Request) {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";
    if ( !webhookSecret) { 
        throw new Error ('please add CLERK_WEBHOOK_SECRET from clerk dashook to .env')
    }

    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id ||!svix_signature ||!svix_timestamp) {
        throw new Response ('no svix headers',{status:400})
        
    }
    const payload = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(webhookSecret)

    let evt: WebhookEvent
    
    try {
        evt = wh.verify(body,{
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            "svix-signature": svix_signature
        }) as WebhookEvent
    } catch (error) {
        console.error('error verifying webhook', error)
        return new Response ('webhook verification failed', {status: 400})
    }

    const eventType = evt.type
    if (eventType === 'user.created') {
        await db.user.create({
            data: {
                externalUserId: payload.data.id,
                username: payload.data.username,
                imageUrl: payload.data.image_url,
                stream: {
                    create: {
                    name:`${payload.data.username}'s stream`
                    }
                }
            }
        })
    } 

      if (eventType === 'user.updated') {
        const currentUser= await db.user.findUnique({
            where: {
                externalUserId: payload.data.id,
            }
        })
        if (!currentUser) {
            return new Response('user not found',{status:400})
            
        }
        await db.user.update({
            where: {
                externalUserId: payload.data.id,
            },
            data: {
                username: payload.data.username,
                imageUrl:payload.data.image_url,
            }
        })

       
        
    } 
    if (eventType === 'user.deleted') {
        const currentUser = await db.user.findUnique({
            where: {
                externalUserId: payload.data.id,
            }
        })
        if (!currentUser) {
                return new Response('user not found',{status:400})
                
        }
        await resetIngresses(payload.data.id)
        await db.user.delete({
        where: {
            externalUserId: payload.data.id,
        }
     })
    }
        
    return new Response('',{status:200})
}