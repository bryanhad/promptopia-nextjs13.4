import { connectToDB } from '@/utils/database'
import Prompt from '@/models/prompt.model'

//you can get the dynamic params from the object GET function parameter
export async function GET(request, {params}) {
    try {
        await connectToDB()
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator')

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (err) {
        return new Response('Failed to fetch all prompts', { status: 500 })
    }

}