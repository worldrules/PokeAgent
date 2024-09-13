"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TypePage = ({ params }: { params: { typeName: string } }) => {
    const { typeName } = params;
    const [pokemonList, setPokemonList] = useState<{ name: string; url: string }[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchPokemonsByType = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
                const data = await response.json();
                if (data.pokemon) {
                    const allPokemons = data.pokemon.map((p: { pokemon: { name: string; url: string } }) => p.pokemon);
                    const start = (page - 1) * itemsPerPage;
                    const end = start + itemsPerPage;
                    setPokemonList(allPokemons.slice(start, end));
                    setTotalPages(Math.ceil(allPokemons.length / itemsPerPage));
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
    }, [typeName, page]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(storedFavorites);
    }, []);

    const toggleFavorite = (pokemonName: string) => {
        let updatedFavorites;
        if (favorites.includes(pokemonName)) {
            updatedFavorites = favorites.filter((name) => name !== pokemonName);
        } else {
            updatedFavorites = [...favorites, pokemonName];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    if (loading) return <p className="text-center text-xl">Carregando ...</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Pokémon do Tipo {typeName}</h1>
            {pokemonList.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {pokemonList.map((pokemon) => {
                            const isFavorite = favorites.includes(pokemon.name);
                            const pokemonId = pokemon.url.split('/')[6];
                            return (
                                <div
                                    key={pokemon.name}
                                    className="relative block bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transform hover:scale-90 transition-transform duration-300"
                                    style={{ width: '180px', height: '250px' }}
                                >
                                    <Link href={`/pokemon/${pokemon.name}`} passHref>
                                        <div className="relative w-full h-3/4 cursor-pointer">
                                            <Image
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                                                alt={pokemon.name}
                                                layout="fill"
                                                objectFit="contain"
                                                className="absolute inset-0"
                                            />
                                        </div>
                                        <div className="p-4 text-center">
                                            <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
                                        </div>
                                    </Link>
                                    <button
                                        className={`absolute top-2 right-2 ${isFavorite ? 'text-yellow-500' : 'text-gray-400'} text-2xl`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(pokemon.name);
                                        }}
                                    >
                                        {isFavorite ? '★' : '☆'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(prev => prev - 1)}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                        >
                            Anterior
                        </button>
                        <span className="mx-4 text-xl">
                            Página {page} de {totalPages}
                        </span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(prev => prev + 1)}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                        >
                            Próximo
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-center text-xl">Nenhum Pokémon encontrado para este tipo.</p>
            )}
        </div>
    );
};

export default TypePage;
