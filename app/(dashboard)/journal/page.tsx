import {prisma} from "@/utils/db";
import {getUserByClerkId} from "@/utils/auth";
import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Link from "next/link";
import {analyze} from "@/utils/ai";
import Questions from "@/components/questions";
const getEntries = async () =>{
    const user = await getUserByClerkId()
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy:{
            createdAt: 'desc',
        },

    })
    return entries;
}


const JournalPage = async () =>{
    const entries = await getEntries();
    console.log(entries);
    return (
        <div className={"p-10 bg-zinc-400/10 h-full"}>
            <h2 className={"text-3xl mb-8"}>Journal</h2>
            <Questions />
            <div className={"mt-4 grid grid-cols-3 gap-4"}>
                <NewEntryCard/>
                {entries.map((entry) => (
                    <div key={entry.id}>
                        <Link href={`/journal/${entry.id}`}>
                            <EntryCard entry={entry} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default JournalPage;