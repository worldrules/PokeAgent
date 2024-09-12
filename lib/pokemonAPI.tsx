"use client";


const POKEMON_API = "https://pokeapi.co/api/v2/";

import { useEffect, useState } from "react";

export function usePokemonList(limit: number = 151): string[] {
    const [pokemon, setPokemon] = useState<string[]>([]);

    useEffect(() => {
        async function fetchPokemon(): Promise<void> {
            try {
                const response = await fetch(POKEMON_API + "pokemon?limit=151&offset=0");
                if (!response.ok) {
                    throw new Error('Falha ao buscar a lista de Pokémon.');
                }
                const data = await response.json();
                setPokemon(data.results.map((p: { name: string }) => p.name));
            } catch (error) {
                console.error("Erro ao buscar a lista de Pokémon:", error);
            }
        }

        fetchPokemon();
    }, [limit]);

    return pokemon;
}
