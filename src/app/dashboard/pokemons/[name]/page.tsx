import { Pokemon, PokemonsResponse } from "@/pokemons";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoChevronBackCircleOutline } from "react-icons/io5";
const POKE_API_URL = process.env.POKE_API_URL

interface Props {
    params: { name: string };
}

// Genera al momento de construir la app estas paginas
export async function generateStaticParams() {
    const data: PokemonsResponse = await fetch(`${POKE_API_URL}v2/pokemon?limit=151`)
        .then(response => response.json())

    return data.results.map(({ name }) => ({ name }));
}

// Metadata dinamica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { id, name } = await getPokemon(params.name);
        return {
            title: `Pokémon #${id} -- ${name}`,
            description: `Información detallada del Pokémon ${name}`,

        }
    } catch (error) {
        return {
            title: "Pokémon no encontrado",
            description: "No se ha encontrado la información del Pokémon",
        }
    }
}

const getPokemon = async (name: string): Promise<Pokemon> => {
    const pokemon: Pokemon = await fetch(`${POKE_API_URL}v2/pokemon/${name}`, {
        // cache: 'force-cache', // TODO: cambia esto en un futuro
        next: {
            revalidate: 60 * 60 * 30 * 6
        }
    })
        .then(response => response.json())
        .catch(err => notFound());
    return pokemon;
}

export default async function getPokemonName({ params }: Props) {
    const pokemon = await getPokemon(params.name);

    const { type } = pokemon.types[0];

    return (
        <div className="flex mt-5 flex-col items-center text-slate-800 max-h-screen overflow-y-scroll">
            <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
                <div className="mt-2 mb-8 w-full">
                    <header className="flex flex-row items-center">
                        <Link
                            href={'/dashboard/pokemons'}
                            className="text-2xl hover:shadow-sm hover:text-3xl hover:text-yellow-600"
                        >
                            <IoChevronBackCircleOutline />
                        </Link>
                        <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
                            #{pokemon.id} {pokemon.name}
                        </h1>
                    </header>
                    <div className="flex flex-col justify-center items-center">
                        <Image
                            style={{ width: "auto", height: "auto" }}
                            src={pokemon.sprites.other?.dream_world.front_default ?? ''}
                            width={150}
                            height={150}
                            alt={`Imagen del pokemon ${pokemon.name}`}
                            className="mb-5"
                        />


                        <div className="flex flex-wrap gap-2">
                            {
                                pokemon.moves.map((move, index) => (
                                    <div key={index} className={`center relative inline-block select-none whitespace-nowrap rounded-lg ${type.name.toUpperCase().includes('FIRE') ? 'bg-red-500' : type.name.toUpperCase().includes('WATER') ? 'bg-blue-500' : type.name.toUpperCase().includes('BUG') ? 'bg-amber-500' : type.name.toUpperCase().includes('ELECTRIC') ? 'bg-orange-500' : 'bg-green-500'} py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white`}>
                                        <p key={move.move.name} className="mr-2 capitalize font-bold">{move.move.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 px-2 w-full">

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
                        <p className="text-sm text-gray-600">Types</p>
                        <div className="text-base font-medium text-navy-700 flex">
                            {
                                pokemon.types.map(type => (
                                    <p key={type.slot} className="mr-2 capitalize">{type.type.name}</p>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
                        <p className="text-sm text-gray-600">Peso</p>
                        <span className="text-base font-medium text-navy-700 flex">
                            {
                                pokemon.weight
                            }
                        </span>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
                        <p className="text-sm text-gray-600">Regular Sprites</p>
                        <div className="flex justify-center">

                            <Image
                                style={{ width: "auto", height: "auto" }}
                                src={pokemon.sprites.front_default}
                                width={100}
                                height={100}
                                alt={`sprite ${pokemon.name}`}
                            />

                            <Image
                                style={{ width: "auto", height: "auto" }}
                                src={pokemon.sprites.back_default}
                                width={100}
                                height={100}
                                alt={`sprite ${pokemon.name}`}
                            />

                        </div>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
                        <p className="text-sm text-gray-600">Shiny Sprites</p>
                        <div className="flex justify-center">

                            <Image
                                style={{ width: "auto", height: "auto" }}
                                src={pokemon.sprites.front_shiny}
                                width={100}
                                height={100}
                                alt={`sprite ${pokemon.name}`}
                            />

                            <Image
                                style={{ width: "auto", height: "auto" }}
                                src={pokemon.sprites.back_shiny}
                                width={100}
                                height={100}
                                alt={`sprite ${pokemon.name}`}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
