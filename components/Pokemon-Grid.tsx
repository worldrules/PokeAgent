"use client"
import { useState } from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { PokemonCard } from './PokemonCard';

interface PokemonGridProps {
    pokemonList: unknown
}

export function PokemonGrid(pokemonList: PokemonGridProps) {
    const [searchText, setSearchText] = useState("");
    console.log(pokemonList)

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

            <div className='mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left'>
                <PokemonCard name="Pikachu" />
                <PokemonCard name="Pikachu" />
                <PokemonCard name="Pikachu" />
            </div>
        </>
    )

}