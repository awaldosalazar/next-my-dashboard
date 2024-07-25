import { PokemonGrid, PokemonsReponse, SimplePokemon } from "@/pokemons";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Favoritos',
    description: 'Ad minim sit cupidatat culpa consectetur.',
};

export default async function PokemonsPage() {

    return (
        <div className="flex flex-col">

            <span className="text-5xl my-2 text-center">Pokémons Favoritos <small className="text-blue-500 uppercase font-bold">Global State</small></span>

            <PokemonGrid pokemons={[]} />

        </div>
    );
}