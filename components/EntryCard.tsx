
// const EntryCard = ({entry}) =>{
//     const date = new Date(entry.createdAt).toDateString()
//
//     return (
//         <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
//             <div className="px-4 py-5 ">{date}</div>
//             <div className="px-4 py-5 ">{entry.Analysis.summary}</div>
//             <div className="px-4 py-4 " style={{backgroundColor: entry.Analysis.color}}>color</div>
//         </div>
//     )
// }
//
// export default EntryCard;

import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"



type CardProps = React.ComponentProps<typeof Card>

export default function EntryCard({entry}) {
    const date = new Date(entry.createdAt).toDateString()
    const entries = [
        {
            title: `Date: ${date}`,

        },
        {
            title: `Summary: ${entry.Analysis.summary}`,

        },

    ]
    return (
        <Card className={cn("w-[280px]")}>
            <CardHeader>
                <CardTitle>{entry.Analysis.mood}</CardTitle>
                <CardDescription>your sentiment score: {entry.Analysis.sentimentScore}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">

                <div>
                    {entries.map((notification, index) => (
                        <div
                            key={index}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {notification.title}
                                </p>

                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter style={{ backgroundColor:entry.Analysis.color }}>

            </CardFooter>
        </Card>
    )
}
