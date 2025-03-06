import {prisma} from "@/utils/db";
import {getUserByClerkId} from "@/utils/auth";
import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Link from "next/link";
import Questions from "@/components/questions";

const getEntries = async () =>{
    const user = await getUserByClerkId()

    return( await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy:{
            createdAt: 'desc',
        },
        include: {
            Analysis: true,
        },

    }));
}


const JournalPage = async () =>{
    const entries = await getEntries();
    console.log(entries);
    return (
        <div className={"p-10 bg-zinc-400/10 h-full"}>
            <h2 className={"text-3xl mb-8"}>Journal</h2>
            <Questions />
            <NewEntryCard/>
            <div className={"mt-4 items-center justify-center grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"}>

                {entries.map((entry) => (
                    <div className={'mb-4'} key={entry.id}>
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