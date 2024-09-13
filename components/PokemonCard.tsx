import Image from 'next/image';
import { useState, useEffect } from 'react';
import { PokemonClient, Pokemon } from 'pokenode-ts';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useFavorites } from '@/components/context/FavoriteContext';

interface PokemonCardProps {
    name: string;
}

export function PokemonCard({ name }: PokemonCardProps) {
    const { data: session } = useSession();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const { favorites, setFavorites } = useFavorites();
    const [isFavorite, setIsFavorite] = useState(false);

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

    useEffect(() => {
        setIsFavorite(favorites.includes(name));
    }, [favorites, name]);

    const toggleFavorite = () => {
        if (!session) {
            alert("Você precisa estar logado para adicionar favoritos.");
            return;
        }

        const updatedFavorites = new Set(favorites);
        if (isFavorite) {
            updatedFavorites.delete(name);
        } else {
            updatedFavorites.add(name);
        }
        setFavorites(Array.from(updatedFavorites));
    };

    if (!pokemon) return null;

    return (
        <div className="p-4 border rounded-lg shadow-lg hover:shadow-xl m-3 transition-shadow duration-300 cursor-pointer relative">
            <Link href={`/pokemon/${pokemon.name}`} passHref>
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
            </Link>
            {session && (
                <button
                    onClick={toggleFavorite}
                    className={`absolute top-2 right-2 text-2xl ${isFavorite ? 'text-yellow-400' : 'text-gray-400'}`}
                    aria-label="Toggle Favorite"
                >
                    {isFavorite ? '★' : '☆'}
                </button>
            )}
        </div>
    );
}

export default PokemonCard;
