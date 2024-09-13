"use client";

import { useEffect, useState } from "react";
import PokemonCard from "@/components/PokemonCard";
import { useFavorites } from "@/components/context/FavoriteContext";

const Stars = () => {
    const { favorites, setFavorites } = useFavorites();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const storedFavorites = localStorage.getItem("favorites");
            const parsedFavorites: { [key: string]: boolean } = storedFavorites ? JSON.parse(storedFavorites) : {};
            const favoriteNames = Object.keys(parsedFavorites).filter(name => parsedFavorites[name]);
            setFavorites(favoriteNames);
        } catch (error) {
            console.error("Erro ao buscar favoritos:", error);
            setError("Ocorreu um erro ao carregar seus favoritos.");
        } finally {
            setLoading(false);
        }
    }, [setFavorites]);

    if (loading) return <p className="text-center text-xl">Carregando...</p>;

    if (error) {
        return <p className="text-center text-xl text-red-500">{error}</p>;
    }

    if (favorites.length === 0) {
        return (
            <div className="max-w-7xl mx-auto my-12">
                <h1 className="text-3xl font-bold text-center mb-6">Meus Pokémons Favoritos</h1>
                <p className="text-center text-xl">Você ainda não tem Pokémon favoritos.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto my-12">
            <h1 className="text-3xl font-bold text-center mb-6">Meus Pokémons Favoritos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map((pokemonName: string) => (
                    <PokemonCard key={pokemonName} name={pokemonName} />
                ))}
            </div>
        </div>
    );
};

export default Stars;
