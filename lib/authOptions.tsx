import { NextAuthOptions } from "next-auth";
import mongoose from "mongoose";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';



const connectToDatabase = async () => {




    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }
    await mongoose.connect(process.env.MONGODB_URI as string);
    return mongoose.connection;
};

const verifyPassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
};

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
                username: { label: 'Username', type: 'text', placeholder: 'Ash Ketchum 🌝' },
                password: { label: 'Password', type: 'password', placeholder: '••••••••••••••••••' },
            },
            async authorize(credentials) {
                const client = await connectToDatabase();
                const user = await User.findOne({ username: credentials?.username }).exec();

                if (!user) {
                    client.close();
                    throw new Error('No user found!');
                }

                const isValid = await verifyPassword(credentials!.password, user.password);

                if (!isValid) {
                    client.close();
                    throw new Error('Could not log you in!');
                }

                client.close();
                return { id: user._id.toString(), username: user.username };
            },
        }),
    ],
};
