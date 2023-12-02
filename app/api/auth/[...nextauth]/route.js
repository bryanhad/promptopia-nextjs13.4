import User from '@/models/user.model'
import { connectToDB } from '@/utils/database'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// every nextjs route, is a serverless route!
// serverless -> lambda -> dynamodb

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        // we make sure that we always know which user is currently online
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email,
            })
            session.user.id = sessionUser._id.toString()
            return session
        },
        // sign in method that automatically creeates the user if not registered in the db
        async signIn({ profile }) {
            try {
                // 1. connect to db
                await connectToDB()

                // 2. check if user already exists
                // 3. if not, create a new user
                const userExists = await User.findOne({
                    email: profile.email,
                })
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture,
                    })
                }

                return true
            } catch (err) {
                console.log(err)
                return false
            }
        },
    },
})

export { handler as GET, handler as POST }
