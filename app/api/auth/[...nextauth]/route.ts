import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Simple demo auth - in production use proper authentication
        if (credentials?.email && credentials?.password) {
          return {
            id: '1',
            email: credentials.email,
            name: 'Demo User'
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup'
  },
  session: {
    strategy: 'jwt'
  }
})

export { handler as GET, handler as POST }