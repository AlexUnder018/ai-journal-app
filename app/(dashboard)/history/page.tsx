import {getUserByClerkId} from "@/utils/auth";
import {prisma} from "@/utils/db";
import HistoryCharts from "@/components/HistoryCharts";
const getData = async() => {
    const user = await getUserByClerkId()
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id,

        },
        orderBy:{
            createdAt: 'asc',
        }
    })
    const sum = analyses.reduce((all, current) => all + current.sentimentScore,0)
    const average = Math.round(sum/analyses.length)
    return {analyses, average}
}

const History = async () =>{
    const {average, analyses} = await getData()
    console.log(analyses)
    return <div className={'w-full h-full'}>
        <div>{`Avg. Sentiment${average}`}</div>
        <div className={'h-full w-full'}>
            <HistoryCharts data={analyses} />
        </div>
    </div>
}
export default History;