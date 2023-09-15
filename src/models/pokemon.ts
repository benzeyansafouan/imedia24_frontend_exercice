// Define a TypeScript interface to describe the shape of Pokémon data
export interface Pokemon {
    id: string;
    name: string;
    height: string;
    weight: string;
    url:string;
    sprites: {
        front_default: any;
    };
}