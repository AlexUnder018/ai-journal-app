// import { prisma } from '@/utils/db'
// import { currentUser } from '@clerk/nextjs/server'
// import { redirect } from 'next/navigation'
//
// const createNewUser = async () => {
//     const user = await currentUser()
//     console.log(user)
//
//     const match = await prisma.users.findUnique({
//         where: {
//             clerkId: user.id as string,
//         },
//     })
//
//     if (!match) {
//         prisma.users.create({
//             data: {
//                 clerkId: user.id,
//                 email: user?.emailAddresses[0].emailAddress,
//             },
//         })
//     }
//
//     redirect('/journal')
// }
//
// const NewUser = async () => {
//     await createNewUser()
//     return <div>...loading</div>
// }
//
// export default NewUser

import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
    const user = await currentUser()
    console.log(user)

    const match = await prisma.users.findUnique({
        where: {
            clerkId: user.id as string,
        },
    })

    if (!match) {
        await prisma.users.create({
            data: {
                clerkId: user.id,
                email: user?.emailAddresses[0].emailAddress,
            },
        })
    }

    redirect('/journal')
}

const NewUser = async () => {
    await createNewUser()
    return <div>...loading</div>
}

export default NewUser