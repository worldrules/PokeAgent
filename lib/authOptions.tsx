import { NextAuthOptions } from "next-auth";

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'Ash Ketchum 🌝' },
                password: { label: 'Password', type: 'password', placeholder: '••••••••••••••••••' },
            },
            async authorize(credentials) {
                const client = await connectToDatabase();
                const usersCollection = client.db().collection('users');

                // Encontrar usuário pelo e-mail
                const user = await usersCollection.findOne({ email: credentials?.email });

                if (!user) {
                    client.close();
                    throw new Error('No user found!');
                }

                // Verificar se a senha está correta
                const isValid = await verifyPassword(credentials!.password, user.password);

                if (!isValid) {
                    client.close();
                    throw new Error('Could not log you in!');
                }

                client.close();
                return { id: user._id.toString(), email: user.email };
            },
        }),
    ],
};
