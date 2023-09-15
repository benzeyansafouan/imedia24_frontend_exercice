import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonCard from '../components/PokemonCard';
import {Pokemon} from 'models/pokemon';
import '@testing-library/jest-dom';

// mocked data
const mockPokemonData : Pokemon[]=[
    {
        id: '1',
        name: 'Bulbasaur',
        height: '7',
        weight: '69',
        url:'',
        sprites: {
            front_default: 'bulbasaur-image-url',
        },
    },
    {
        id: '2',
        name: 'Charmander',
        height: '6',
        weight: '85',
        url:'',
        sprites: {
            front_default: 'charmander-image-url',
        },
    },
];

test('renders PokemonCard component with loading state', () => {
    render(<PokemonCard pokemon={[]} loading={true} />);

    // check for loading message if is displayed
    const loadingElement = screen.getByText(/Loading/i);
    expect(loadingElement).toBeInTheDocument();
});

test('renders PokemonCard component with Pokemon data', () => {
    render(<PokemonCard pokemon={mockPokemonData} loading={false} />);

    // check for pokemon names are displayed
    const bulbasaurName = screen.getByText(/Bulbasaur/i);
    const charmanderName = screen.getByText(/Charmander/i);

    // check for pokemon images are displayed
    const bulbasaurImage = screen.getByAltText(/Bulbasaur/i);
    const charmanderImage = screen.getByAltText(/Charmander/i);

    // check if the search input is displayed
    const searchInput = screen.getByPlaceholderText(/Search/i);

    expect(bulbasaurName).toBeInTheDocument();
    expect(charmanderName).toBeInTheDocument();
    expect(bulbasaurImage).toBeInTheDocument();
    expect(charmanderImage).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
});

test('searches for Pokemon', () => {
    render(<PokemonCard pokemon={mockPokemonData} loading={false} />);

    // type 'Char' into the search input
    const searchInput = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'Char' } });

    // check if only Charmander is displayed
    const bulbasaurName = screen.queryByText(/Bulbasaur/i);
    const charmanderName = screen.queryByText(/Charmander/i);

    expect(bulbasaurName).not.toBeInTheDocument();
    expect(charmanderName).toBeInTheDocument();
});

