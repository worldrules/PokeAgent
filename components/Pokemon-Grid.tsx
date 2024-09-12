"use client"
import { useState } from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { PokemonCard } from './PokemonCard';
import { usePokemonList } from '@/lib/pokemonAPI';
import Image from 'next/image';


export function PokemonGrid() {
    const [searchText, setSearchText] = useState("");
    const pokemon = usePokemonList();

    const filteredPokemon = searchText
        ? pokemon.filter((name) =>
            name.toLowerCase().includes(searchText.toLowerCase())
        )
        : [];


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
                <div className="flex justify-center items-center py-8">
                    <Image src="/pokeapi.png" alt="subtitulo" width={200} height={200} />
                </div>
            </div>

            <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
                {filteredPokemon.length > 0 ? (
                    filteredPokemon.map((name, index) => (
                        <PokemonCard key={index} name={name} />
                    ))
                ) : (
                    <p className="text-center w-full col-span-4 font-semibold">
                        Inicie a busca pelo nome de um Pokemon
                    </p>
                )}
            </div>
        </>
    )

}