import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/libs/prismadb'
import bcrypt from 'bcrypt'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),

    // Credentials
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
        },
        password: {
          label: 'email',
          type: 'password',
        },
      },
      async authorize(credentials) {
        console.log('here ====?? ')
        console.log(credentials)

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid email or password')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        console.log('user', user)

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid email or password')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid email or password')
        }

        return user
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/login',
  },

  // debug: process.env.NODE_ENV === 'development',

  session: {
    strategy: 'jwt',
  },
}

export default NextAuth(authOptions)
