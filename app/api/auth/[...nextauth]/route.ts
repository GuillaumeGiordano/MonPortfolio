import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../../../../env';

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        }),
        // Ajoutez d'autres fournisseurs d'authentification si nécessaire
    ],
})

export { handler as GET, handler as POST }