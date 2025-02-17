import {getUserByClerkId} from "@/utils/auth";
import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";
import {analyze} from "@/utils/ai";

export const POST = async() => {
    const user = await getUserByClerkId()
    const entry = await prisma.journalEntry.create({
        data:{
            // userdId: user.id
            userId: user.id,
            content: 'write about your day!'

        }
    })
    const analysis = await analyze(entry.content)
    await prisma.analysis.create({
        data: {
            userId: user.id,
            entryId: entry.id,
            ...analysis,
        },
    })
    // revalidatePath('/journal')
    return NextResponse.json({data:entry})
}