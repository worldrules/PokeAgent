import { PokemonClient } from "pokenode-ts";

const api = new PokemonClient();

export async function getPokemonColorByType(type: string): Promise<string> {
    try {
        const typesResponse = await api.listTypes();
        const typeData = typesResponse.results.find(t => t.name === type);

        const colors: { [key: string]: string } = {
            bug: '#A8B820',
            dark: '#705848',
            dragon: '#7038F8',
            electric: '#F8D030',
            fairy: '#EE99AC',
            fighting: '#C03028',
            fire: '#F08030',
            flying: '#A890F0',
            ghost: '#705898',
            grass: '#78C850',
            ground: '#E0C068',
            ice: '#98D8D8',
            normal: '#A8A878',
            poison: '#A040A0',
            psychic: '#F85888',
            rock: '#B8A038',
            steel: '#B8B8D0',
            water: '#6890F0',
        };

        return colors[typeData?.name || ''] || '#FFFFFF';
    } catch (error) {
        console.error("Failed to fetch type color:", error);
        return '#FFFFFF';
    }
}
