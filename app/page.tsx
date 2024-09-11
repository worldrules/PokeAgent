import Dashboard from "@/components/Dashboard";
import { PokemonGrid } from "@/components/Pokemon-Grid";
// import Register from "@/components/Register";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto my-12 space-y-5">
      <PokemonGrid />
      <Dashboard />
      {/* <Register /> */}
    </main>
  );
}
