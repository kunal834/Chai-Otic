import NextAuth from 'next-auth'
import GitHubProvider  from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
import connectDb from '@/db/connectDB';
import User from '@/models/User';

export const authoptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Add this block to allow more time
  httpOptions: {
    timeout: 10000, // Wait up to 10 seconds instead of 3.5
  }
    }),
  ],
  
  // Make sure to use a secret for NextAuth itself (required for production)
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github" || account.provider == "google") {
        await connectDb()

        // Check if user exists
        const currentuser = await User.findOne({ email: user.email })

        if (!currentuser) {
          // Create new user
          const newUser = await User.create({
  email: user.email,
  username: user.email.split("@")[0],
  razorpayid: process.env.NEXT_PUBLIC_KEY_ID, 
  razorpaysecret: process.env.KEY_SECRET,
})

          user.name = newUser.username
        } else {
          user.name = currentuser.username
        }
        return true;
      }
      return false; // Return false if provider is not github
    },

    // ADD THIS: This passes the username to the Frontend (Dashboard)
    async session({ session }) {
      // Find user in DB to get the latest username
      await connectDb()
      const dbUser = await User.findOne({ email: session.user.email })
      if (dbUser) {
        session.user.name = dbUser.username
        session.user.username = dbUser.username
      }
      return session
    }
  }
}

const handler = NextAuth(authoptions)
export { handler as GET, handler as POST }