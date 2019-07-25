import React from "react";
import PokemonSearch from "./components/PokemonSearch";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          PokeMon App
        </a>
      </nav>
      
      <PokemonSearch name="akki" numberOfPokemon={4} />
    </div>
  );
};

export default App;
