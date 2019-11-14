import React, { Component } from 'react';
import Pokemon from './Pokemon';
import Form from './Form';
import Pokemons from './pokemons';
import SpeakApi from './SpeakApi';


class Pokedex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonList: [],
            currentPokemon: {
                name: "",
                image: ""
            }
        }
    }

    componentDidMount() {
        Pokemons
            .list()
            .then(pokemonList => {
                this.setState({
                    pokemonList
                }) // ogni volta ti mantiene la lista intatta
            })
    }

    submit = (e) => {
        e.preventDefault();
        if (this.state.currentPokemon.name && this.state.currentPokemon.image) {

            SpeakApi
                .speak(`Stai per inserire ${this.state.currentPokemon.name} Evviva le Waifu!`)
                .then(() => Pokemons.add(this.state.currentPokemon))
                .then(() => {
                    return Pokemons.list()
                })
                .then(pokemonList => {
                    this.setState({
                        pokemonList,
                        currentPokemon: {}  /*ogni volta che aggiorni aggiungi un pokemon alla lista 
                        l'input è vuoto */
                    })
                })
        }

    }

    onDelete = (id) => {
        Pokemons
            .remove(id)
            .then(() => {
                return Pokemons.list()
            })
            .then(pokemonList => {
                this.setState({
                    pokemonList
                })
            })
    }

    onChangePokemonName = (e) => { // ogni volta che si aggiunge un cambiamento 
        //continua ad aggiornarsi
        const {
            currentPokemon
        } = this.state;
        this.setState({
            currentPokemon: {
                ...currentPokemon,
                name: e.target.value
            }
        })
    }

    onChangePokemonImage = (image) => {
        const {
            currentPokemon
        } = this.state;
        this.setState({
            currentPokemon: {
                ...currentPokemon,
                image
            }
        })
    }

    render() {

        const {
            pokemonList,
            currentPokemon
        } = this.state;

        const cards = pokemonList.map(pokemon => {
            return <Pokemon
                onDelete={this.onDelete}
                key={pokemon.id}
                pokemon={pokemon} />
        }) // creo la lista

        return (
            <div className="containerPokedex">
            
           
            
              
              
           
                
                <Form
                    submit={this.submit}
                    click={this.click}
                    value={currentPokemon.name}
                    changeImage={this.onChangePokemonImage}
                    change={this.onChangePokemonName}></Form>

                    {cards} 
            </div>
        );
    }
}

export default Pokedex;