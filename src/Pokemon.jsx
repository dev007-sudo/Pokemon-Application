import { useEffect, useState } from "react"
import { PokemonCards } from "./COMPONENTS/PokemonCards"
export const Pokemon = () => {
    // defining use state
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    // api url
    const ApiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=24'

    // defining function for fetching pokemon data from api
    const FetchPokemon = async () => {
        // calling api through async await
        try {
            const res = await fetch(ApiUrl);
            const data = await res.json();

            // getting all pokemon data url cos actuall data will get from this this url
            const detailedPokemonData = data.results.map(async (curPokemon) => {
                // fetching all url of pokemon api
                const res = await fetch(curPokemon.url);
                const data = await res.json();
                return data;
            });

            // this i am doing becose when we are trying to return that api url data then again we got a promise thats why
            const detailesres = await Promise.all(detailedPokemonData)
            setPokemon(detailesres)
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(error)
        }
    }

    // defining useeffect here for handle external data in react
    useEffect(() => {
        FetchPokemon();
    }, [])

    // input search
    const searchData = pokemon.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLocaleLowerCase()));

    // handling loading state
    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    // handling error if any in api
    if (error) {
        return (
            <div>
                <h1>Error:{error.massage}</h1>
            </div>
        )
    }

    return (
        <section className="container">
            <header>
                <h1>Let's Catch Pokemon</h1>
            </header>
            <div className="pokemon-search">
                <input type="text" placeholder="search pokemon"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="cards">
                {
                    searchData.map((curPokemon) => {
                        return (
                            <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
                        )
                    })
                }
            </div>
        </section>
    )
}