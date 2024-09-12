"use client"


import { useEffect, useState } from "react";
import Image from "next/image";
import { PokemonClient } from "pokenode-ts";

interface Pokemon {
    name: string;
    sprites: {
        front_default: string | null;
    };
    height: number;
    weight: number;
    types: {
        type: {
            name: string;
        };
    }[];
}

const PokemonPage = ({ params }: { params: { pokemonName: string } }) => {
    const { pokemonName } = params;
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {

            try {
                const api = new PokemonClient();
                const data = await api.getPokemonByName(pokemonName);
                setPokemon(data);
            } catch (error) {
                console.log("Failed to fetch Pokemon data:", error);
            };
        };
        fetchPokemon();
    }, [pokemonName, setPokemon]);


    if (!pokemon) return <p className="text-center text-xl">Carregando ...</p>

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="max-w-sm w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="relative">
                    <Image
                        src={pokemon.sprites.front_default ?? ""}
                        alt={pokemon.name}
                        width={300}
                        height={300}
                        className="object-contain w-full h-auto"
                    />
                    <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 text-sm font-semibold rounded-full">
                        {pokemon.types.map((t) => t.type.name).join(", ")}
                    </div>
                </div>
                <div className="p-4">
                    <h1 className="text-2xl font-bold capitalize mb-2">{pokemon.name}</h1>
                    <p className="text-lg font-medium mb-1">Height: {pokemon.height / 10} m</p>
                    <p className="text-lg font-medium mb-1">Weight: {pokemon.weight / 10} kg</p>
                </div>
            </div>
        </div>
    );
}

export default PokemonPage;