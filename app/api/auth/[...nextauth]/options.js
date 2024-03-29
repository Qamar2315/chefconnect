import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from '@models/user';
import dbConnect from "@utils/connectDB";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        let userRole = "GitHub User";
        if (profile?.email == "qamarislam1232@gmail.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_Secret,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();

          if (foundUser) {
            console.log("User Exists");
            const match = credentials.password == foundUser.password;

            if (match) {
              console.log("Good Pass");
              delete foundUser.password;
              delete foundUser.recipes;
              foundUser["user_id"] = foundUser._id;
              foundUser["role"] = "user";
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.user_id = user.user_id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user){
        session.user.role = token.role;
        session.user.user_id = token.user_id;
      } 
      return session;
    },
  },
};