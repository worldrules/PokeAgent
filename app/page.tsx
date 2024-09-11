import Dashboard from "@/components/Dashboard";
import { PokemonGrid } from "@/components/Pokemon-Grid";
import { getPokemonList } from "@/lib/pokemonAPI";
// import Register from "@/components/Register";

export default async function Home() {
  const pokemonList = await getPokemonList();

  return (
    <main className="max-w-7xl mx-auto my-12 space-y-5">
      <PokemonGrid pokemonList={pokemonList} />
      <Dashboard />
      {/* <Register /> */}
    </main>
  );
}
