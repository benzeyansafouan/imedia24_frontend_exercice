import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionTypes, LoadPokemonsAction, loadPokemonsSuccess, loadPokemonsFailure } from '../actions/pokemonActions';
import axios, {AxiosResponse} from 'axios';

function* fetchPokemons(action: LoadPokemonsAction) {
    try {
        const { offset, limit } = action.payload;
        const response: AxiosResponse = yield call(axios.get, `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
        yield put(loadPokemonsSuccess(response.data.results));
    } catch (error) {
        yield put(loadPokemonsFailure(error as Error));
    }
}

export function* pokemonSaga() {
    yield takeEvery(ActionTypes.LOAD_POKEMONS, fetchPokemons);
}
