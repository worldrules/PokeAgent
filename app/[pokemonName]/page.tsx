

export default async function PokemonPage({ params }: { params: { pokemonName: string } }) {
    const { pokemonName } = params;

    return (
        <>
            <h1 className="text-4xl font-bold pt-4">Pikachu</h1>
        </>
    )

}