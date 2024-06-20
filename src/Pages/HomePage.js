import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import Card from "../components/Card";

const HomePage = () => {
  const [randomImage, setRandomImage] = useState("");
  const [pokemonData, setPokemonData] = useState([]);

  const fetchRandomImage = async () => {
    try {
      const randomImageUrl = `https://picsum.photos/seed/${Math.floor(
        Math.random() * 1000
      )}/400`;
      setRandomImage(randomImageUrl);
    } catch (error) {
      console.error("Erro ao buscar imagem aleatória:", error);
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=3"
        );
        const data = response.data.results;
        const pokemonList = await Promise.all(
          data.map(async (pokemon) => {
            const pokeData = await axios.get(pokemon.url);
            return {
              id: pokeData.data.id,
              name: pokemon.name.toUpperCase(),
              height: pokeData.data.height,
              weight: pokeData.data.weight,
              imageUrl: pokeData.data.sprites.front_default,
            };
          })
        );
        setPokemonData(pokemonList);
      } catch (error) {
        console.error("Erro ao buscar pokémons:", error);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-title">Pokémons e Imagem Aleatória</h2>
      <div className="random-image-container">
        {randomImage && (
          <img
            style={{ borderRadius: 10 }}
            src={randomImage}
            alt="Imagem Aleatória"
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          marginTop: 36,
          gap: 120,
        }}
        className="cards-container"
      >
        {pokemonData.map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            title={pokemon.name}
            description={`Altura: ${pokemon.height} | Peso: ${pokemon.weight}`}
            imageUrl={pokemon.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
