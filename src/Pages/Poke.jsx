import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./Poke.module.css";

// import { FaWeightHanging } from "@react-icons/all-files/fa/FaWeightHanging";
// import { GiBodyHeight } from "@react-icons/all-files/gi/GiBodyHeight";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function Poke() {
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  let pokemonChosed = queryParameters.get("pokemon");

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonChosed}`)
      .then((res) => res.json())
      .then(
        (data) => {
          setPokemon(data);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    setInterval(() => {
      $.adaptiveBackground.run();
    }, 1000);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Carregando...</div>;
  } else {

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Carregando...</div>;
    } else {

        return (
            <div className={styles.Poke} key={pokemon.id}>
                {/* <h1>#{pokemon.id.padStart(3,'0')}</h1> */}
                <div className={styles.Name}>
                    <h1>#{pokemon.id}</h1>
                    <h1>{capitalizeFirstLetter(pokemon.name)}</h1>
                </div>
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    data-adaptive-background
                />
                <div className={styles.Description}>
                    <p>
                      {/* <GiBodyHeight size={30} /> */}
                        <span>{pokemon.height}</span>
                    </p>
                    <p>
                      {/* <FaWeightHanging size={30} /> */}
                        <span>{pokemon.weight}</span>
                    </p>
                    {pokemon.stats.map((stat) =>
                    (<p>
                        <span key={stat.stat.name}>
                            {capitalizeFirstLetter(stat.stat.name)}:
                        </span>
                        <span key={stat.base_stat}>
                            {stat.base_stat}
                        </span>
                    </p>)
                    )}
                    {pokemon.types.map((type) =>
                    (<p key={type.type.name}>
                        <button>
                            {capitalizeFirstLetter(type.type.name)}
                        </button>
                    </p>)
                    )}
                </div>
            </div>

        );
    }
  }
}

