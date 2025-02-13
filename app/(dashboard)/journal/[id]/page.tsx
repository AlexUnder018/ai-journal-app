import Editor from "@/components/Editor";
import {getUserByClerkId} from "@/utils/auth";
import {prisma} from "@/utils/db";
const getEntry  =  async (id) =>{
    const user = await getUserByClerkId()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id,
            },
        },
        include: {
            Analysis: true,
        }
    })
    return entry
}
const entryPage = async ( {params}: {params: {id: string}}) => {
    const {id}  = await params;
    const entry = await getEntry(id)

    return  <div className={'h-full w-full'}>
            < Editor entry={entry}/>
            </div>
}
export default entryPage;