import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { axiosInstance } from "./lib/axios";
import axios from "axios";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      lastName: string;
      email: string;
      isActive: boolean;
      roles: [
        {
          id: number;
          description: string;
        }
      ];
      accessToken: string;
    } & DefaultSession["user"];
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const tokenData = await axiosInstance.post(
            "/auth/login",
            credentials,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const sessionData = await axiosInstance.get("/user/init-data", {
            headers: {
              Authorization: `Bearer ${tokenData.data.accessToken}`,
            },
          });

          return { ...sessionData.data, ...tokenData.data };
        } catch (e) {
          if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data.message);
          }
          console.log(e);
          throw new Error("An error occurred");
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
    
      session.user = token as any;
      return session;
    },
  },
  trustHost: true,
});
