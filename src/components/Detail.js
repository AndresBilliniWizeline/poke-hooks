import React, { useState, useEffect, useCallback } from "react";

import Summary from "./Summary";

const Detail = (props) => {
  const [loadedPokemon, setLoadedPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    console.log(
      `Sending Http request for new pokemon with name ${props.selectedPokemon}`
    );
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${props.selectedPokemon}`
      );
      const pokeData = await response.json();

      const loadedPokemon = {
        image: `https://img.pokemondb.net/artwork/large/${pokeData.name}.jpg`,
        name: pokeData.name,
        height: pokeData.height,
        weight: pokeData.weight,
        type: pokeData.types[0].type.name,
        movesCount: pokeData.moves.length,
      };
      setIsLoading(false);
      setLoadedPokemon(loadedPokemon);
    } catch (error) {
      console.log(error);
    }
  }, [props.selectedPokemon]);

  useEffect(() => {
    fetchData();
    return () => {
      console.log("Too soon...");
    };
  }, [fetchData, props.selectedPokemon]);

  

  let content = <p>Loading Detail...</p>;

  if (!isLoading && loadedPokemon.name) {
    content = (
      <Summary
        image={loadedPokemon.image}
        name={loadedPokemon.name}
        height={loadedPokemon.height}
        weight={loadedPokemon.weight}
        type={loadedPokemon.type}
        movesCount={loadedPokemon.movesCount}
      />
    );
  } else if (!isLoading && !loadedPokemon.name) {
    content = <p>Failed to fetch Detail.</p>;
  }
  return content;
};

export default React.memo(Detail, (prevProps, nextProps) => {
  return nextProps.selectedPokemon === prevProps.selectedPokemon;
});
