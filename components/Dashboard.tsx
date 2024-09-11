"use client";

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import Image from 'next/image';

const Dashboard = () => {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="">
                <Image
                    src="/pikachu.png"
                    alt="Pikachu"
                    width={400}
                    height={400}
                />
            </div>
            {session ? (
                <>
                    <img
                        src={session.user?.image as string}
                        className="rounded-full h-20 w-20"
                        alt=""
                    />
                    <h1 className="text-3xl text-green-500 font-bold">
                        Welcome back, {session.user?.name}
                    </h1>
                    <p className="text-2xl font-semibold">{session.user?.email}</p>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="border border-black rounded-lg bg-red-400 px-5 py-1"
                    >
                        Sair ❌
                    </button>
                </>
            ) : (
                <div className="flex flex-col items-center space-y-5 mt-10">
                    <h1 className="text-3xl text-red-500 font-bold">
                        Você não está logado ainda ...
                    </h1>
                    <button
                        onClick={() => signIn("google")}
                        className="border border-black rounded-lg bg-blue-400 px-5 py-1"
                    >
                        Entrar com Google 💻
                    </button>
                    <button
                        onClick={() => signIn("github")}
                        className="border border-black rounded-lg bg-green-400 px-5 py-1"
                    >
                        Entrar com GitHub 🖥️
                    </button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
