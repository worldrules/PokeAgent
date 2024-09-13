"use client";

import Dashboard from "@/components/Dashboard";
import { PokemonGrid } from "@/components/Pokemon-Grid";
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="max-w-7xl mx-auto my-12 space-y-5">
      {session ? (
        <PokemonGrid />
      ) : (
        <Dashboard />
      )}
    </main>
  );
}
