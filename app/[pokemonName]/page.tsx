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
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
            <Image
                src={pokemon.sprites.front_default ?? ''}
                alt={pokemon.name}
                width={200}
                height={200}
            />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
        </div>
    );
}

export default PokemonPage;