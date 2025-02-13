import {getUserByClerkId} from "@/utils/auth";
import {prisma} from "@/utils/db";
import {NextResponse} from "next/server";
import { revalidatePath } from 'next/cache'
import {analyze} from "@/utils/ai";

export const PATCH = async (request, {params}: {params: {id:string}}) =>{
   const user =  await getUserByClerkId()
    const {content} = await request.json()
    const {id} = await params
    const updatedEntry = await prisma.journalEntry.update({

        where:{
            userId_id: {
                userId: user.id,
                id: id
            }
        },
        data: {
            content,
        }

    })
    const analysis = await analyze(updatedEntry.content)
    await prisma.analysis.upsert({
        where: {
            entryId: updatedEntry.id,
        },
        create:{
            userId: user.id,
            entryId: updatedEntry.id,
            ...analysis,
        },
        update: analysis

    })
    revalidatePath('/journal/${updatedEntry.id}')
    return NextResponse.json({data: {...updatedEntry, Analysis: analysis}})
}