import { Reducer } from 'redux';
import { Pokemon } from 'models/pokemon';
import { ActionTypes, PokemonActionTypes } from '../actions/pokemonActions';

// the initial state
const initialState: Pokemon[] = [];

// reducer
const pokemonsReducer: Reducer<Pokemon[], PokemonActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_POKEMONS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

export default pokemonsReducer;
