"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TypePage = ({ params }: { params: { typeName: string } }) => {
    const { typeName } = params;
    const [pokemonList, setPokemonList] = useState<{ name: string; url: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonsByType = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
                const data = await response.json();
                if (data.pokemon) {
                    setPokemonList(data.pokemon.map((p: { pokemon: { name: string; url: string } }) => p.pokemon));
                } else {
                    console.error("No Pokémon found for this type.");
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch Pokémon by type:", error);
                setLoading(false);
            }
        };

        fetchPokemonsByType();
    }, [typeName]);

    if (loading) return <p className="text-center text-xl">Carregando ...</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Pokémon do Tipo {typeName}</h1>
            {pokemonList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {pokemonList.map((pokemon) => (
                        <Link
                            key={pokemon.name}
                            href={`/pokemon/${pokemon.name}`}
                        >
                            <Link href={`/pokemon/${pokemon.name}`} className="block bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transform hover:scale-90 transition-transform duration-300"
                                style={{ width: '180px', height: '250px' }}
                            >
                                <div className="relative w-full h-3/4">
                                    <Image
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`}
                                        alt={pokemon.name}
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
                                </div>
                            </Link>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl">Nenhum Pokémon encontrado para este tipo.</p>
            )}
        </div>
    );
};

export default TypePage;
