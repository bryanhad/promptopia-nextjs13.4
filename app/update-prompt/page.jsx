'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@/components/Form'

function UpdatePromptPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    useEffect(() => {
      async function fetchPromptDetail() {
        const res = await fetch(`/api/prompt/${promptId}`)
        const data = await res.json()

        setPost({
          prompt: data.prompt,
          tag: data.tag
        })
      }
      if (promptId) fetchPromptDetail()
    }, [promptId])

    async function updatePrompt(e) {
        e.preventDefault()
        setSubmitting(true)

        if (!promptId) return alert('Prompt ID not found???!!! u should never encounter this..')

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })
            if (res.ok) {
                router.push('/')
            }
        } catch (err) {
            console.log(err)
        } finally {
            setSubmitting(false)
        }
    }

    return <Form
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
}

export default UpdatePromptPage
