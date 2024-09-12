"use client"
import { useState } from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { PokemonCard } from './PokemonCard';
import { usePokemonList } from '@/lib/pokemonAPI';


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
                <h3 className='text-2xl py-6 text-center'>Search for your Pokemon!</h3>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label htmlFor='pokemonName'>Pokemon Name</Label>
                    <Input
                        autoComplete='off'
                        type='text'
                        id='pokemonName'
                        placeholder='MewTwo, Pikachu, Bulbasaur...'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)} />
                </div>
                <h3 className='text-3xl pt-12 pb-6 text-center'>Pokemon Collection</h3>
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