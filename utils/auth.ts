import {auth} from "@clerk/nextjs/server";
import {prisma} from "@/utils/db";
export const getUserByClerkId = async () => {
    const {userId} = await  auth() //clerk id
    const user = await prisma.users.findUniqueOrThrow({
        where: {
            clerkId: userId,
        },

    }) //compairing clerkid with ours in db
    return user
}

