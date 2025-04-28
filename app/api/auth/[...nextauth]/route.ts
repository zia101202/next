

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { Session, User } from 'next-auth';


interface ExtendedUser extends User {
  id: string;
}

interface ExtendedToken extends JWT {
  id?: string;
}

interface ExtendedSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
  console.log(email);
  console.log(password)

         let user={
          email,
            password,
         }
          return user;
        

        return null;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      const extendedToken = token as ExtendedToken;
      if (user) {
        extendedToken.id = (user as ExtendedUser).id;
      }
      return extendedToken;
    },

    async session({ session, token }) {
      const extendedSession = session as ExtendedSession;
      extendedSession.user.id = (token as ExtendedToken).id ?? '';
      return extendedSession;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
