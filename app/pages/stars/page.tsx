"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [favoritePokemonList, setFavoritePokemonList] = useState<{ name: string; url: string; id: string }[]>([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(storedFavorites);
    }, []);

    useEffect(() => {
        const fetchFavoritePokemons = async () => {
            if (favorites.length === 0) {
                setFavoritePokemonList([]);
                return;
            }

            try {
                const promises = favorites.map(async (pokemonName) => {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                    if (!response.ok) throw new Error(`Failed to fetch ${pokemonName}`);
                    const data = await response.json();
                    return {
                        name: data.name,
                        url: data.sprites.other["official-artwork"].front_default,
                        id: data.id,
                    };
                });

                const results = await Promise.all(promises);
                setFavoritePokemonList(results);
            } catch (error) {
                console.error("Failed to fetch favorite Pokémon data:", error);
            }
        };

        fetchFavoritePokemons();
    }, [favorites]);

    const toggleFavorite = (pokemonName: string) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = prevFavorites.includes(pokemonName)
                ? prevFavorites.filter((name) => name !== pokemonName)
                : [...prevFavorites, pokemonName];

            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Favoritos</h1>
            {favoritePokemonList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favoritePokemonList.map((pokemon) => (
                        <div
                            key={pokemon.id}
                            className="relative block bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transform hover:scale-90 transition-transform duration-300"
                            style={{ width: '180px', height: '250px' }}
                        >
                            <Link href={`/pokemon/${pokemon.name}`} passHref>
                                <div className="relative w-full h-3/4 cursor-pointer">
                                    <Image
                                        src={pokemon.url}
                                        alt={pokemon.name}
                                        layout="fill"
                                        objectFit="contain"
                                        className="absolute inset-0"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "/path/to/placeholder.png";
                                        }}
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
                                </div>
                            </Link>
                            <button
                                className={`absolute top-2 right-2 ${favorites.includes(pokemon.name) ? 'text-yellow-500' : 'text-gray-400'} text-2xl`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(pokemon.name);
                                }}
                            >
                                {favorites.includes(pokemon.name) ? '★' : '☆'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl">Nenhum Pokémon favoritado.</p>
            )}
        </div>
    );
};

export default FavoritesPage;
