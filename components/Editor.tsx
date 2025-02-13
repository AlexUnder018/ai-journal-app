'use client'

import {useState} from "react";
import {useAutosave, Autosave  } from "react-autosave";
import {updateEntry} from "@/utils/api";
import {Analysis} from "@prisma/client";

const Editor = ({entry}) => {
    const [value,setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [analysis, setAnalysis] = useState(entry.Analysis)
    const [issaved, setIssaved] = useState<boolean>(true)
    const {mood, summary, color, subject, negative} = analysis
    const analysisData = [
        {name:'Summary', value: summary},
        {name:'Subject', value: subject},
        {name:'Mood', value: mood},
        {name:'Negative', value: negative ? "True" : "False"},

    ]
    useAutosave({
        data:value,
        onSave: async (value) => {
            // debugger
            setIsLoading(true)
            const data = await updateEntry(entry.id, {content: value})
            setAnalysis(data.Analysis)
            setIsLoading(false)
        },

    })

    return(
        <div className={'w-full h-full grid grid-cols-3'}>
            <div className={"col-span-2"}>
            {isLoading && (<div>...loading</div>)}
            <textarea
                className={'w-full h-full p-8 text-xl outline-none'}
                value={value}
                onChange={e => setValue(e.target.value)}/>

            </div>
            <div className={'border-l border-black/10'}>
                <div className={'px-6 py-10'} style={{backgroundColor: color}}>
                    <h2 className={'text-2xl'}>Analysis</h2>
                </div>
                <div>
                    <ul>
                        {analysisData.map(item => (
                            <li
                                key={item.name}
                                className={'px-2 py-4 border-b border-black/10 border-t flex items-center justify-between'}>
                                <span className={' text-lg font-semibold'}>{item.name}</span>
                                <span>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )

}
export default Editor