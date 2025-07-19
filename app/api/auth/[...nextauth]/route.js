import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
//  
import GitHubProvider from "next-auth/providers/github";
// import mongoose from 'mongoose';
import connectDb from '@/db/connectDB';
import User from '@/models/User';
//import Payment from '@/models/Payment';


export const authoptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],



  // sign in callback to store the data of users after sign in 
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github") {
        // connect to the database '  
        await connectDb()

        //Check if the user already exists in the datatbase 
        const currentuser = await User.findOne({ email: user.email })

        if (!currentuser) {
          // Create a new User
          const newUser = new User({
            email: user.email,
            username: user.email.split("@")[0],

          })
          await newUser.save()  // Save to Database 
          user.name = newUser.username  // user This is the object provided by NextAuth in the signIn() callback:
        }
        else {
          user.name = currentuser.username
        }
        return true;

      }

    }
  }


}






const handler = NextAuth(authoptions)

export { handler as GET, handler as POST }

