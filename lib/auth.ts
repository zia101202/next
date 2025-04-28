import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // Replace this with your own DB/user lookup logic
        if (email === "test@example.com" && password === "password123") {
          return {
            id: "1",
            name: "Test User",
            email: "test@example.com"
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    }
  }
};
