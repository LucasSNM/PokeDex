import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./Poke.module.css";

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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Carregando...</div>;
  } else {
    $.adaptiveBackground.run();

    return (
      <div className={styles.Poke}>
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
          <p>Altura: {pokemon.height}</p>
          <p>Largura: {pokemon.weight}</p>
          <hr />
          <p>
            {pokemon.stats.map((stat, index) => (
              <p key={`stat-${stat.stat.name}-${stat.base_stat}`}>
                {stat.stat.name}: {stat.base_stat}
              </p>
            ))}
          </p>
          <hr />
          {pokemon.types.map((type, index) => (
            <button key={`type-${type.type.name}`}>{type.type.name}</button>
          ))}
        </div>
      </div>
    );
  }
}

{
  /* <img src={pokemon.sprites.front_default}/>
<img src={pokemon.sprites.other.dream_world.front_default}/>
<img src={pokemon.sprites.other.home.front_default}/> */
}
