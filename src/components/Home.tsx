import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Pokemon} from 'models/pokemon';
import PokemonCard from './PokemonCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import {loadPokemons} from '../redux/actions/pokemonActions';
import {RootState} from 'redux/store';


const mapStateToProps = (state: RootState) => {
    return {
        pokemons: state.pokemons,
    };
};
const mapDispatchToProps = {
    loadPokemons,
};

interface HomeProps {
    pokemons: Pokemon[];
    loadPokemons: (offset: number, limit: number) => void;
}

const Home: React.FC<HomeProps> = ({ pokemons, loadPokemons }) => {
    const [pokeData , setPokeData] = useState(Array<Pokemon>);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20");
    const [hasMore, setHasMore] = useState(true);
    const [limit, setLimit] = useState(10);



    const getPokemonData = async(res:Array<Pokemon>) => {
        // a Set to skip redundance
        const uniquePokemonData = new Set<Pokemon>();

        // promise.all to fetch pokemon data concurrently
        await Promise.all(
            res.map(async (item) => {
                // get pokemon informations
                const result = await axios.get(item.url);
                uniquePokemonData.add(result.data);
            })
        );
        // set back the Set to Array to set it to setPokeData
        const uniquePokemonArray = Array.from(uniquePokemonData);
        setPokeData(uniquePokemonArray);
    }


    const fetchMoreData = async () => {
        try {
            // update url to check if there is more data
            setUrl(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`);
            const res = await axios.get(url);
            loadPokemons(0,20);
            getPokemonData(pokemons);
            setLoading(false);
            if (res.data.next) {
                // increment limit
                let incrementedLimit = limit + 20;
                // store incremented value into limit variable.
                setLimit(incrementedLimit);
                loadPokemons(0, incrementedLimit);
            } else {
                // sets 'hasMore' to false to stop loading if there is no next page,
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching more data:', error);
        }
    };

    useEffect(() => {
            fetchMoreData();
    }, [fetchMoreData]);

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand poke-nav" href="#">
                    <img src="./logo192.png" width="40" height="40" className="d-inline-block align-top" alt=""/>&nbsp;
                    Pokemon App
                </a>
            </nav>
            <div className="container">
                <InfiniteScroll
                    dataLength={pokeData.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                <PokemonCard pokemon={pokeData} loading={loading}></PokemonCard>
                </InfiniteScroll>
            </div>
        </div>

    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);