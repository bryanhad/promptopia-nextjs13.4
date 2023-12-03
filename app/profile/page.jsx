'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@/components/Profile'

function ProfilePage() {
    const router = useRouter()
    const { data: session } = useSession()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await res.json()
            setPosts(data)
        }
        if (session?.user.id) fetchPosts()
    }, [session?.user.id])

    function handleEdit(post) {
        router.push(`/update-prompt?id=${post._id}`)
    }

    async function handleDelete(post) {
        const hasConfirmed = confirm('Are you sure you want to delete thiss prompt?')

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })

                const filteredPosts = posts.filter(el => el._id !== post._id)
                setPosts(filteredPosts)
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <Profile
            name="My"
            desc="Welcome to youe personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default ProfilePage
