import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"

import styles from "./Home.module.css";

// interface Pokemon {
//     id: Number,
//     name: String,
//     url: String,
//     color: String,
//     types: []
// }

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function Home() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [listPokemons, setListPokemons] = useState([]);


    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20`)
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

        $.adaptiveBackground.run();

        return (
            <div className={styles.pokemonCardContainer}>
                <header>
                    <img src={`../../pokeball_icon.svg`} height='100px' />
                </header>
                <br />
                {
                    listPokemons.results.map(pokemon => (
                        <a className={styles.pokemonCard} href={`/poke?pokemon=${pokemon.name}`}>
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`}
                                data-adaptive-background
                            />
                            <div className={styles.pokemonInfo}>
                                <span className={styles.pokemonNumber}>#{pokemon.url.split('/')[6].padStart(3, '0')}</span>
                                <span>{capitalizeFirstLetter(pokemon.name)}</span>
                            </div>
                        </a>
                    ))}
            </div>
        );
    }


}
