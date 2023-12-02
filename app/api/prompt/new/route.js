import { connectToDB } from '@/utils/database'
import Prompt from '@/models/prompt.model'

export async function POST(req, res) {
    const { userId, prompt, tag } = await req.json()

    try {
        // we need to connect to db everytime,
        // cuz this every route is a lambda function!
        // meanding it's going to die, after it has done it's job!

        // everytime it get's called, it has to connect to the db, do it's thing, and peace out.
        await connectToDB()
        const newPrompt = await Prompt.create({
            creator: userId,
            prompt,
            tag,
        })

        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (err) {
        return new Response('Failed to create a new prompt', { status: 500 })
    }
}
