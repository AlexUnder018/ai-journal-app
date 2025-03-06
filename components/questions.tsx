'use client'
import {useState} from "react";
import {askQuestion} from "@/utils/api";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
const Questions = () => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('')
    const [response, setResponse] = useState()
    const onChange = (e) => {
        setValue(e.target.value)
        //do things here
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const answer = await askQuestion(value)
        setResponse(answer)
        setValue('')
        console.log(answer)
        setLoading(false)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={'gap-4 flex max-w-xl'}>
                {/*<input disabled={loading} value={value} type="text" placeholder="Any Questions?" onChange={onChange} className={'border border-black/20' +*/}
                {/*    'px-4 py-2 text-lg rounded-lg'} />*/}
                    <Input disabled={loading} value={value} type={"text"} placeholder={"Any questions?"} onChange={onChange} />
                {/*<button disabled={loading} type={"submit"} className={'bg-blue-500 px-4 py-2 rounded-lg text-lg'}>Ask</button>*/}
                    <Button disabled={loading} type={"submit"} className={'bg-blue-500'}>Ask</Button>

                </div>
            </form>
            {loading && (<div>...loading</div>)}
            {response && <div>{response}</div>}
        </div>
    )
}
export default Questions;