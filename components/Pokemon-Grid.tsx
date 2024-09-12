"use client"

import { useState, useEffect } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { PokemonCard } from './PokemonCard';
import { usePokemonList } from '@/lib/pokemonAPI';
import { getPokemonColorByType, pokemonTypeColors } from '@/lib/pokemonTypeColors';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function PokemonGrid() {
    const [searchText, setSearchText] = useState("");
    const [selectedType] = useState<string | null>(null);
    const [typeColors, setTypeColors] = useState<{ [key: string]: string }>({});
    const pokemon = usePokemonList();
    const router = useRouter();

    useEffect(() => {
        const fetchTypeColors = async () => {
            const types = [
                'bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire',
                'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison',
                'psychic', 'rock', 'steel', 'water'
            ];

            const colors: { [key: string]: string } = {};
            for (const type of types) {
                colors[type] = await getPokemonColorByType(type);
            }
            setTypeColors(colors);
        };

        fetchTypeColors();
    }, []);

    const filteredPokemon = searchText || selectedType
        ? pokemon.filter((name) => {
            const matchesName = name.toLowerCase().includes(searchText.toLowerCase());
            const matchesType = selectedType ? pokemonTypeColors[name] === typeColors[selectedType] : true;
            return matchesName && matchesType;
        })
        : [];

    const handleTypeClick = (type: string | null) => {
        if (type) {
            router.push(`/type/${type}`);
        } else {
            router.push('/');
        }
    };

    return (
        <>
            <div>
                <div className='w-full max-w-sm items-center gap-1.5 mx-auto flex flex-col text-center'>
                    <Label htmlFor='pokemonName'>Nome do Pokemon</Label>
                    <Input
                        autoComplete='off'
                        type='text'
                        id='pokemonName'
                        placeholder='MewTwo, Pikachu, Bulbasaur...'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)} />
                </div>
                <div className='flex justify-center items-center py-8'>
                    <Image src="/pokeapi.png" alt="subtitulo" width={200} height={200} />
                </div>
                <div className='text-center mb-6'>
                    <h3 className='text-2xl py-6'>Browse by Type</h3>
                    <div className='flex flex-wrap justify-center gap-2'>
                        {Object.keys(typeColors).map((type) => (
                            <span
                                key={type}
                                className="text-white px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-transform transform hover:scale-105"
                                style={{ backgroundColor: typeColors[type] || '#FFFFFF' }}
                                onClick={() => handleTypeClick(type)}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </span>
                        ))}
                        <span
                            className="text-white px-4 py-2 rounded-full text-xs font-semibold cursor-pointer bg-gray-500 transition-transform transform hover:scale-125"
                            onClick={() => handleTypeClick(null)}
                        >
                            All Types
                        </span>
                    </div>
                </div>
            </div>

            <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
                {filteredPokemon.length > 0 ? (
                    filteredPokemon.map((name, index) => (
                        <PokemonCard key={index} name={name} />
                    ))
                ) : (
                    <p className="text-center w-full col-span-4 font-semibold">
                        {searchText ? 'No Pokémon found. Try a different name.' : 'Inicie a busca pelo nome de um Pokémon'}
                    </p>
                )}
            </div>
        </>
    );
}
