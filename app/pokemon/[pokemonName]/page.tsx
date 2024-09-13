/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { PokemonClient, Pokemon } from "pokenode-ts";
import { pokemonTypeColors } from "@/lib/pokemonTypeColors";
import { useRouter } from "next/navigation";

const PokemonPage = ({ params }: { params: { pokemonName: string } }) => {
    const { pokemonName } = params;
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const api = new PokemonClient();
                const data = await api.getPokemonByName(pokemonName);
                setPokemon(data);
            } catch (error) {
                console.error("Failed to fetch Pokemon data:", error);
            }
        };

        fetchPokemon();
    }, [pokemonName]);

    if (!pokemon) return <p className="text-center text-xl">Carregando ...</p>;

    const typeColors = pokemon.types.map(t => pokemonTypeColors[t.type.name] || '#FFFFFF');

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 p-6">
            <div className="max-w-xs w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                    <Image
                        src={pokemon.sprites.front_default || ''}
                        alt={pokemon.name}
                        width={240}
                        height={240}
                        className="object-contain w-full h-auto"
                    />
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                        {pokemon.types.map((t) => (
                            <span
                                key={t.type.name}
                                className="text-white px-2 py-1 rounded-full text-xs font-semibold cursor-pointer"
                                style={{ backgroundColor: pokemonTypeColors[t.type.name] || '#FFFFFF' }}
                                onClick={() => router.push(`/type/${t.type.name}`)}
                            >
                                {t.type.name}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="p-4">
                    <h1 className="text-3xl font-bold capitalize mb-2 text-center">
                        {pokemon.name}
                    </h1>
                    <p className="text-lg font-medium mb-1 text-center">
                        <span className="font-bold">Height:</span> {pokemon.height / 10} m
                    </p>
                    <p className="text-lg font-medium mb-1 text-center">
                        <span className="font-bold">Weight:</span> {pokemon.weight / 10} kg
                    </p>
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2 text-center">Abilities:</h2>
                        <ul className="list-disc list-inside mb-4">
                            {pokemon.abilities.map((ability) => (
                                <li key={ability.ability.name} className="text-lg text-center">{ability.ability.name}</li>
                            ))}
                        </ul>
                        <h2 className="text-xl font-semibold mb-2 text-center">Stats:</h2>
                        <ul className="list-disc list-inside">
                            {pokemon.stats.map((stat) => (
                                <li key={stat.stat.name} className="text-lg text-center">
                                    <span className="font-bold">{stat.stat.name}:</span> {stat.base_stat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonPage;
