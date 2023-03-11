import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"

import styles from "./Poke.module.css";

export function Poke() {

    const location = useLocation()
    const queryParameters = new URLSearchParams(location.search)
    let pokemonChosed = queryParameters.get("pokemon")

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonChosed}`)
            .then(res => res.json())
            .then(
                (data) => {
                    setPokemon(data);
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Carregando...</div>;
    } else {
        return (
            <div className={styles.Poke}>
                {/* <img src={pokemon.sprites.front_default}/>
                <img src={pokemon.sprites.other.dream_world.front_default}/>
            <img src={pokemon.sprites.other.home.front_default}/> */}
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} />
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} />
                <h1>{pokemon.name}</h1>
            </div>
        );
    }
}