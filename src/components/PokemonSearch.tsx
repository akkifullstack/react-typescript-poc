import React, { Component } from "react";
import User from "../interface/User.interface";

interface SearchState {
  error: boolean;
  pokemon: Pokemon;
}

interface Pokemon {
  name: string;
  numberOfAbilities: number;
  baseExperience: number;
  imageUrl: string;
}

class PokemonSearch extends Component<User, SearchState> {
  pokemonRef: React.RefObject<HTMLInputElement>;
  constructor(props: User) {
    super(props);
    this.state = {
      error: false,
      pokemon: null
    };
    this.pokemonRef = React.createRef();
  }
  onSearchClick = () => {
    const inputValue = this.pokemonRef.current.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`).then(res => {
      if (res.status !== 200) {
        this.setState({ error: true });
        return;
      }
      res.json().then(data => {
        this.setState({
          error: false,
          pokemon: {
            name: data.name,
            numberOfAbilities: data.abilities.length,
            baseExperience: data.base_experience,
            imageUrl: data.sprites.front_default
          }
        });
      });
    });
  };
  render() {
    const { name: userName, numberOfPokemon } = this.props;
    const { error, pokemon } = this.state;

    let resultMarkup;

    if (error) {
      resultMarkup = <p>Pokenmon not found , try again</p>;
    } else if (this.state.pokemon) {
      resultMarkup = (
        <div>
          <img
            src={pokemon.imageUrl}
            alt="pokemonimage"
            width="100px"
            height="100px"
          />
          <p>
            {pokemon.name} has {pokemon.numberOfAbilities} abilities and{" "}
            {pokemon.baseExperience}
            base experience points
          </p>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 pokemon__name">
            <h5>
              User {userName}{" "}
              {numberOfPokemon && <span>has {numberOfPokemon} pokemon</span>}
            </h5>
          </div>
        </div>
        <div>
          <input
            type="test"
            ref={this.pokemonRef}
            onBlur={this.onSearchClick}
            placeholder="Enter your Fav Pokemon"
          />
        </div>
        {resultMarkup}
        <p className="text-mute ">
          After filling text field click outside the field
        </p>
      </div>
    );
  }
}

export default PokemonSearch;
