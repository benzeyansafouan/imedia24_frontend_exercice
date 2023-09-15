import { Action } from 'redux';
import { Pokemon } from 'models/pokemon';

export enum ActionTypes {
    LOAD_POKEMONS = 'LOAD_POKEMONS',
    LOAD_POKEMONS_SUCCESS = 'LOAD_POKEMONS_SUCCESS',
    LOAD_POKEMONS_FAILURE = 'LOAD_POKEMONS_FAILURE',
}

// action interfaces
export interface LoadPokemonsAction extends Action<ActionTypes.LOAD_POKEMONS> {
    payload: {
        offset: number;
        limit: number;
    };
}

export interface LoadPokemonsSuccessAction extends Action<ActionTypes.LOAD_POKEMONS_SUCCESS> {
    payload: Pokemon[];
}

export interface LoadPokemonsFailureAction extends Action<ActionTypes.LOAD_POKEMONS_FAILURE> {
    payload: Error;
}

// action creators
export const loadPokemons = (offset: number, limit: number): LoadPokemonsAction => ({
    type: ActionTypes.LOAD_POKEMONS,
    payload: { offset, limit },
});

export const loadPokemonsSuccess = (data: Pokemon[]): LoadPokemonsSuccessAction => ({
    type: ActionTypes.LOAD_POKEMONS_SUCCESS,
    payload: data,
});

export const loadPokemonsFailure = (error: Error): LoadPokemonsFailureAction => ({
    type: ActionTypes.LOAD_POKEMONS_FAILURE,
    payload: error,
});

// action types
export type PokemonActionTypes =
    | LoadPokemonsAction
    | LoadPokemonsSuccessAction
    | LoadPokemonsFailureAction;
