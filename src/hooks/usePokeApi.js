import { useState, useEffect, useCallback } from "react";

function usePokeApi(url) {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const pokemonList = data.results;
      const parsedPokemonList = pokemonList.map((pokemon, index) => ({
        name: pokemon.name,
        id: index + 1,
      }));
      setPokemonList(parsedPokemonList);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [url]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return [isLoading, pokemonList];
}

export default usePokeApi;
