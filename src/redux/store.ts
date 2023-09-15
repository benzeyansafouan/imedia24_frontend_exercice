import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { pokemonSaga } from './sagas/pokemonSaga';
import pokemonsReducer from './reducers/pokemonReducer';

// the root reducer by combining reducers
const rootReducer = combineReducers({
    pokemons: pokemonsReducer,
});

// the root saga by combining sagas
function* rootSaga() {
    yield all([pokemonSaga()]);
}

// redux saga middleware
const sagaMiddleware = createSagaMiddleware();

// redux store
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

// running the root saga
sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof rootReducer>;
export default store;
