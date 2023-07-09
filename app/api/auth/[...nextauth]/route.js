import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/db";
import User from "@/models/userModel";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Bob" },
        email: { label: "Email", type: "text", placeholder: "example@mail.com" },
        password: { label: "Password", type: "text", placeholder: "password" }
      },
      async authorize(credentials, req) {
        const { name, email, password } = credentials;

        try {
          await connectToDB();

          const user = await User.findOne({ email: email });

          if (name && user) {
            throw new Error("Email is already in use.");
          }

          if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = {
              name,
              email,
              password: hashedPassword
            };

            const createdUser = await User.create(newUser);

            return createdUser;
          }

          if (await bcrypt.compare(password, user.password)) {
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email
            };
          }

          return null;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.name = token.name;
      session.user.email = token.email;

      return session;
    },
    async jwt({ token }) {
      return token;
    }
  },
  pages: {
    signIn: "/auth/signin"
  }
});

export { handler as GET, handler as POST };