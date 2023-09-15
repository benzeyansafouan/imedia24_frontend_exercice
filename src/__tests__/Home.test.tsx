import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';
import {Provider} from 'react-redux';
import store from 'redux/store';
import '@testing-library/jest-dom';

test('test home page', () => {
    const {container}=render(<Provider store={store}>
                <Home/>
            </Provider>);
    const loadingElement = screen.getAllByText(/Loading/i);
    expect(loadingElement.some(element => element)).toBe(true);
    expect(container).toHaveTextContent('Pokemon App');
});