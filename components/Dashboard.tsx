"use client"

import { useSession } from 'next-auth/react';
import React from 'react'

const Dashboard = () => {
    const { data: session } = useSession();

    return (
        <>
            {session ? (
                <>
                    <h1>Welcome back</h1>
                </>
            ) : (
                <>
                    <h1 className='text-3xl text-red-500 font-bold'>Você não está logado ainda ...</h1>
                    <button onClick={() => signIn("google")} className='border border-black rounded-lg'>Entrar com Google</button>
                    <button onClick={() => signIn("github")} className='border border-black rounded-lg'>Entrar com GitHub</button>
                </>
            )}
        </>
    )
}

export default Dashboard