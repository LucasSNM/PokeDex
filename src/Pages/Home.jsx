import { useEffect, useState } from 'react';

import styles from "./Home.module.css";

export function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [listPokemons, setListPokemons] = useState([]);


    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon`)
            .then(res => res.json())
            .then(
                (data) => {
                    setListPokemons(data);
                    // if (index == limit - 1)
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
            <ul>
                {
                listPokemons.results.map(pokemon => (
                    <p>
                        <a key={pokemon.name} href={`/poke?pokemon=${pokemon.name}`}>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} />
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`} />
                            {pokemon.url.split('/')[6]} - {pokemon.name}
                        </a>
                    </p>
                ))}
            </ul>
        );
    }


}
