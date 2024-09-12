import Image from 'next/image';
import { useState, useEffect } from 'react';
import { PokemonClient, Pokemon } from 'pokenode-ts';
import Link from 'next/link';

interface PokemonCardProps {
    name: string;
}

export function PokemonCard({ name }: PokemonCardProps) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const api = new PokemonClient();
                const data = await api.getPokemonByName(name);
                setPokemon(data);
            } catch (error) {
                console.error('Failed to fetch Pokemon data:', error);
            }
        };

        fetchPokemon();
    }, [name]);

    if (!pokemon) return false;

    return (
        <Link href={`/pokemon/${pokemon.name}`} passHref>
            <div className="p-4 border rounded-lg shadow-lg hover:shadow-xl m-3 transition-shadow duration-300 cursor-pointer">
                <div className="flex flex-col items-center">
                    <Image
                        src={pokemon.sprites.front_default || '/default.png'}
                        alt={pokemon.name}
                        width={100}
                        height={100}
                        className="mb-2"
                    />
                    <h2 className="text-lg font-bold capitalize">{pokemon.name}</h2>
                </div>
            </div>
        </Link>
    );
}
