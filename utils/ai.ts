import { ChatOpenAI } from '@langchain/openai'
import {StructuredOutputParser} from "@langchain/core/output_parsers";
import z from 'zod'
import {PromptTemplate} from "@langchain/core/prompts";
import {Document} from "@langchain/core/documents"
import {loadQARefineChain} from "langchain/chains"
import { OpenAIEmbeddings } from "@langchain/openai"
import {MemoryVectorStore} from "langchain/vectorstores/memory"
const model = new ChatOpenAI({apiKey: process.env.OPENAI_API_KEY ,temperature: 0 , model: 'gpt-3.5-turbo'})

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        sentimentScore: z.number().describe('sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'),
        mood: z.string().describe('the mood of the person who wrote the journal entry'),
        summary: z.string().describe('quick summary of the entire entry'),
        subject: z.string().describe('subject to the entire entry'),
        negative: z.boolean().describe('is the journal entry negative ?(i.e. does it contains negative emotions?)'),
        color: z.string().describe('a hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'),
    })
)



const getPrompt = async (content) => {
    const format_instructions = parser.getFormatInstructions()

    const prompt = new PromptTemplate({
        template:
            'Analyze the following journal entry. Follow the instructions and format your response to match the format ' +
            'instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: { format_instructions },
    })
    const input = await prompt.format({
        entry: content,
    })
    console.log(input)
    return  input

}

export const analyze = async (content) => {
    const input = await getPrompt(content)
    const result = await model.invoke(input)
    // console.log(result)
    try {
        return parser.parse(result.content)
    }
    catch (e) {
        console.error(e)
    }
}
export const qa = async(question, entries) => {

    const docs = entries.map(entry => {
        return new Document({
            pageContent: entry.content,
            metadata: {id: entry.id, createdAt: entry.createdAt},
            }
        )
    })
    const model = new ChatOpenAI({apiKey: process.env.OPENAI_API_KEY, temperature:0, model: 'gpt-4o-mini'})


    const embeddings = new OpenAIEmbeddings()
    console.log(question)

    const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
    const relevantDocs = await store.similaritySearch(question)

    if (!relevantDocs || relevantDocs.length === 0) {
        throw new Error("No relevant documents found.");
    }
    const chain = loadQARefineChain(model)

    const res = await chain.invoke({
        input_documents: relevantDocs,
        question,
    })
    return res.output_text
}









